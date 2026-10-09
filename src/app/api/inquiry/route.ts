import { createHmac, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import type { Inquiry, InquiryResponse } from "@/types/inquiry";
import { budgets, businessTypes, interests, limits, slots, timelines } from "@/content/inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ config */

const MAX_BODY_BYTES = 16 * 1024; // the largest valid inquiry is well under 8 KB
const WEBHOOK_TIMEOUT_MS = 8000;
const RATE = { windowMs: 10 * 60 * 1000, max: 5 }; // 5 submissions per IP per 10 minutes

const json = (body: InquiryResponse, status = 200, headers?: HeadersInit) =>
  NextResponse.json<InquiryResponse>(body, { status, headers: { "cache-control": "no-store", ...headers } });

/* ------------------------------------------------------------- rate limit */

// In-memory, per server instance. Good enough for one Node process; use a shared store
// (Redis/Upstash, or the hosting platform's WAF) when running several instances.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): number {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) {
    hits.set(ip, recent);
    return Math.ceil((RATE.windowMs - (now - recent[0])) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE.windowMs)) hits.delete(k);
  return 0;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/* -------------------------------------------------------------- validation */

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneOf = <T extends readonly string[]>(v: unknown, list: T) => (typeof v === "string" && (list as readonly string[]).includes(v) ? v : "");

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

type Clean = Omit<Inquiry, "website">;

function validate(raw: Partial<Inquiry>): { data?: Clean; error?: string } {
  const callDate = raw.call && typeof raw.call === "object" ? str(raw.call.date, 10) : "";
  const data: Clean = {
    projectType: oneOf(raw.projectType, businessTypes),
    services: Array.isArray(raw.services) ? [...new Set(raw.services.filter((s) => oneOf(s, interests)))] : [],
    requirements: text(raw.requirements, limits.requirements),
    budget: oneOf(raw.budget, budgets),
    timeline: oneOf(raw.timeline, timelines),
    call: callDate ? { date: callDate, slot: oneOf(raw.call?.slot, slots) || slots[0] } : null,
    name: str(raw.name, limits.name),
    company: str(raw.company, limits.company),
    email: str(raw.email, limits.email).toLowerCase(),
    phone: str(raw.phone, limits.phone),
  };

  if (!data.projectType) return { error: "Choose the type of business." };
  if (data.requirements.length < 10) return { error: "Please describe your operation in at least 10 characters." };
  if (data.call && (!DATE.test(data.call.date) || Number.isNaN(Date.parse(data.call.date)))) return { error: "Choose a valid call date." };
  if (!data.name) return { error: "Name is required." };
  if (!EMAIL.test(data.email)) return { error: "A valid email is required." };
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return { error: "A valid phone number is required." };
  return { data };
}

/* ----------------------------------------------------------------- helpers */

function makeRef() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const rnd = Array.from(randomBytes(4), (b) => letters[b % letters.length]).join("");
  return `INQ-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${rnd}`;
}

/** Forward to the configured webhook. Returns true only on a 2xx response within the timeout. */
async function deliver(payload: object): Promise<{ ok: boolean; reason?: string }> {
  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (!hook) return { ok: false, reason: "INQUIRY_WEBHOOK_URL not set" };

  let url: URL;
  try {
    url = new URL(hook);
  } catch {
    return { ok: false, reason: "INQUIRY_WEBHOOK_URL is not a valid URL" };
  }
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !local && process.env.NODE_ENV === "production") return { ok: false, reason: "webhook must use https" };

  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { "content-type": "application/json", "user-agent": "petra-website/inquiry" };
  const secret = process.env.INQUIRY_WEBHOOK_SECRET;
  if (secret) headers["x-petra-signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;

  try {
    const r = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS), cache: "no-store" });
    return r.ok ? { ok: true } : { ok: false, reason: `webhook responded ${r.status}` };
  } catch (e) {
    return { ok: false, reason: e instanceof Error && e.name === "TimeoutError" ? "webhook timed out" : "webhook unreachable" };
  }
}

/* ------------------------------------------------------------------- route */

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported content type." }, 415);
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "Request is too large." }, 413);

  const wait = rateLimited(clientIp(req));
  if (wait) {
    return json({ ok: false, error: `Too many requests. Please try again in ${Math.ceil(wait / 60)} minutes, or email us directly.` }, 429, { "retry-after": String(wait) });
  }

  let raw: Partial<Inquiry>;
  try {
    const body = await req.text();
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) return json({ ok: false, error: "Request is too large." }, 413);
    raw = JSON.parse(body);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("not an object");
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (raw.website) return json({ ok: true, ref: makeRef(), delivered: true });

  const { data, error } = validate(raw);
  if (!data) return json({ ok: false, error }, 422);

  const ref = makeRef();
  const result = await deliver({ ref, receivedAt: new Date().toISOString(), source: "website", ...data });

  // Logs carry no personal data: only the reference, delivery result and non-identifying fields.
  const meta = { ref, delivered: result.ok, type: data.projectType, products: data.services, call: Boolean(data.call) };
  if (result.ok) console.info("[inquiry] delivered", JSON.stringify(meta));
  else console.error("[inquiry] NOT DELIVERED", JSON.stringify({ ...meta, reason: result.reason }));

  return json({ ok: true, ref, delivered: result.ok });
}
