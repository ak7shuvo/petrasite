"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { Container, Label } from "@/shared/section";
import { SplitText } from "@/components/motion/split-text";
import { Button, ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import type { Inquiry, InquiryResponse } from "@/types/inquiry";
import { budgets, businessTypes, inquirySteps, interests, limits, slots, timelines } from "@/content/inquiry";

const types = businessTypes;
const steps = inquirySteps;

const empty: Inquiry = {
  projectType: "", services: [], requirements: "", budget: "", timeline: "", call: null,
  name: "", company: "", email: "", phone: "", website: "",
};

function Choice({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "flex min-h-14 max-md:min-h-12 items-center justify-between gap-3 rounded-xl border bg-ink-2 px-4 py-3 text-left text-[13px] shadow-[0_8px_20px_-14px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-0.5",
        on ? "border-teal bg-teal/15 text-cream" : "border-line hover:border-cream/40",
      )}
    >
      {children}
      {on && <Check size={14} className="shrink-0 text-teal-glow" />}
    </button>
  );
}

function Field({ id, label, ...p }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.18em] text-cream-mute">{label}</label>
      <input id={id} {...p} className="h-12 border border-line bg-ink px-4 text-sm max-md:text-base outline-none transition-colors focus:border-teal" />
    </div>
  );
}

export function Contact() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Inquiry>(empty);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<InquiryResponse | null>(null);
  const [wantCall, setWantCall] = useState(false);

  const set = <K extends keyof Inquiry>(k: K, v: Inquiry[K]) => { setD((p) => ({ ...p, [k]: v })); setErr(""); };
  const toggleService = (s: string) => set("services", d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s]);

  // computed once on mount so render stays pure
  const [tomorrow] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));

  function validate(): string {
    if (step === 0 && !d.projectType) return "Choose the type of business.";
    if (step === 1 && d.requirements.trim().length < 10) return "Tell us a little about your operation (at least 10 characters).";
    if (step === 3 && wantCall && !d.call?.date) return "Pick a date, or switch to no call.";
    if (step === 4) {
      if (!d.name.trim()) return "Enter your name.";
      if (!/^\S+@\S+\.\S{2,}$/.test(d.email.trim())) return "Enter a valid email, like name@company.com.";
      if (d.phone.replace(/\D/g, "").length < 10) return "Enter a phone number with at least 10 digits.";
    }
    return "";
  }

  async function next() {
    const e = validate();
    if (e) return setErr(e);
    if (step < 4) return setStep(step + 1);
    setBusy(true);
    try {
      const r = await fetch("/api/inquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) });
      const j: InquiryResponse | null = await r.json().catch(() => null);
      if (j?.ok) setRes(j);
      else setErr(j?.error ?? `Something went wrong (${r.status}). Please try again or email ${site.email}.`);
    } catch {
      setErr("Could not reach the server. Email us directly and we will reply within one working day.");
    } finally {
      setBusy(false);
    }
  }

  const mailto = res?.ref
    ? `mailto:${site.email}?subject=${encodeURIComponent(`${d.projectType} (${res.ref})`)}&body=${encodeURIComponent(
        `Reference: ${res.ref}\nName: ${d.name}\nCompany: ${d.company}\nPhone: ${d.phone}\nServices: ${d.services.join(", ") || "-"}\nBudget: ${d.budget || "-"}\nTimeline: ${d.timeline || "-"}\n${d.call ? `Call: ${d.call.date}, ${d.call.slot}\n` : ""}\n${d.requirements}`,
      )}`
    : "";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink py-28 max-md:py-14 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-teal/20 blur-[140px]" />
      <Container className="relative grid gap-16 max-md:gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Label>08 / Book a demo</Label>
          <SplitText id="contact-title" text="See Petra running on your property." className="mt-6 max-md:mt-4 max-w-[14ch] text-[clamp(2.3rem,4.8vw,4.6rem)] max-md:max-w-[16ch] max-md:text-[2rem] font-extrabold leading-[0.97] tracking-[-0.06em]" />
          <p className="mt-8 max-w-[44ch] font-sans text-[17px] leading-relaxed text-cream-dim max-md:mt-5 max-md:text-base">
            Tell us about your operation and the products you are considering. We will walk you through them live, on sample data, and answer questions about setup and deployment.
          </p>
          <ul className="mt-8 space-y-3 font-sans text-[14px] text-cream-dim max-md:mt-5">
            <li className="flex items-center gap-3"><Clock size={16} aria-hidden className="shrink-0 text-teal-glow" />We reply within one working day.</li>
            <li className="flex items-center gap-3"><Check size={16} aria-hidden className="shrink-0 text-teal-glow" />No commitment. Budget is optional.</li>
            <li className="flex items-center gap-3"><ShieldCheck size={16} aria-hidden className="shrink-0 text-teal-glow" />Your details are used only to reply. <a href="/privacy" className="underline decoration-cream/30 underline-offset-4 hover:text-cream">Privacy notice</a></li>
          </ul>
          <div className="mt-10 flex flex-col gap-3 text-sm max-md:mt-6">
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-4 hover:text-teal-glow"><Mail size={18} className="text-teal-glow" />{site.email}</a>
            <a href={`tel:${site.phoneHref}`} className="flex min-h-11 items-center gap-4 hover:text-teal-glow"><Phone size={18} className="text-teal-glow" />{site.phone}</a>
          </div>
        </div>

        <div className="border border-line bg-ink-2 p-6 max-md:p-4 sm:p-10">
          {res ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="flex flex-col items-center py-8 text-center" role="status">
              <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden>
                <motion.circle cx="44" cy="44" r="40" fill="none" stroke="#14B8A6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease }} />
                <motion.path d="M26 45l12 12 24-26" fill="none" stroke="#F1F5F9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7, ease }} />
              </svg>
              <h3 className="mt-8 text-3xl font-bold tracking-[-0.05em]">Thank you, {d.name.split(" ")[0]}.</h3>
              <p className="mt-3 max-w-[42ch] font-sans text-[15px] text-cream-dim">
                {res.delivered
                  ? "Your inquiry reached our team. We will reply within one working day. Keep this reference:"
                  : "Your reference is below, but the inquiry could not be forwarded to our inbox automatically."}
              </p>
              <div className="mt-5 border border-dashed border-teal px-5 py-3 text-lg font-semibold text-teal-glow">{res.ref}</div>
              {!res.delivered && (
                <>
                  <p className="mt-6 max-w-[40ch] font-sans text-[14px] text-cream-dim">Please send the same details by email so they reach us right away. The button opens your mail app with everything filled in.</p>
                  <ButtonLink href={mailto} className="mt-4">Email it to PETRA</ButtonLink>
                </>
              )}
            </motion.div>
          ) : (
            <>
              <ol className="mb-10 max-md:mb-6 flex items-center gap-2" aria-label="Progress">
                {steps.map((s, i) => (
                  <li key={s} className="flex flex-1 flex-col gap-2" aria-current={i === step ? "step" : undefined}>
                    <span className="relative h-px bg-line">
                      <motion.span className="absolute inset-y-0 left-0 bg-teal" animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.5, ease }} />
                    </span>
                    <span className={cn("hidden text-[10px] uppercase tracking-[0.16em] sm:block", i === step ? "text-cream" : "text-cream-mute")}>{s}</span>
                    <span className="sr-only">{i < step ? " (done)" : ""}</span>
                  </li>
                ))}
              </ol>
              <p className="-mt-4 mb-6 text-[11px] uppercase tracking-[0.18em] text-cream-mute sm:hidden">Step {step + 1} of {steps.length} · {steps[step]}</p>

              <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                  <label>Leave empty<input tabIndex={-1} autoComplete="off" value={d.website} onChange={(e) => set("website", e.target.value)} /></label>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }} className="min-h-[340px] max-md:min-h-0">
                    {step === 0 && (
                      <fieldset>
                        <legend className="text-2xl max-md:text-xl font-bold tracking-[-0.04em]">What kind of business are you?</legend>
                        <div className="mt-6 max-md:mt-4 grid gap-3 max-md:gap-2 sm:grid-cols-2">
                          {types.map((t) => <Choice key={t} on={d.projectType === t} onClick={() => set("projectType", t)}>{t}</Choice>)}
                        </div>
                      </fieldset>
                    )}
                    {step === 1 && (
                      <div>
                        <h3 className="text-2xl max-md:text-xl font-bold tracking-[-0.04em]">Which products interest you?</h3>
                        <p className="mt-2 text-[12px] text-cream-mute">Select any that apply.</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {interests.map((c) => (
                            <button key={c} type="button" aria-pressed={d.services.includes(c)} onClick={() => toggleService(c)}
                              className={cn("rounded-lg border bg-ink-2 px-3 py-2 max-md:py-2.5 text-[12px] transition-all hover:-translate-y-0.5", d.services.includes(c) ? "border-teal bg-teal/15" : "border-line hover:border-cream/40")}>
                              {c}
                            </button>
                          ))}
                        </div>
                        <label htmlFor="req" className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-cream-mute">Tell us about your property or operation</label>
                        <textarea id="req" value={d.requirements} onChange={(e) => set("requirements", e.target.value)} rows={5}
                          placeholder="How many rooms, outlets or branches? What do you use today?"
                          maxLength={limits.requirements} aria-describedby="req-hint" required
                          className="mt-2 w-full resize-y border border-line bg-ink p-4 text-sm max-md:text-base outline-none focus:border-teal" />
                        <p id="req-hint" className="mt-1.5 flex justify-between text-[11px] text-cream-mute"><span>At least 10 characters.</span><span>{d.requirements.length}/{limits.requirements}</span></p>
                      </div>
                    )}
                    {step === 2 && (
                      <div>
                        <h3 className="text-2xl max-md:text-xl font-bold tracking-[-0.04em]">Budget & go-live timeline</h3>
                        <p className="mt-2 text-[12px] text-cream-mute">Both optional. Choose “Not sure yet” or skip ahead.</p>
                        <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cream-mute">Estimated budget <span className="normal-case tracking-normal">(optional)</span></div>
                        <div className="mt-3 grid gap-3 max-md:grid-cols-2 max-md:gap-2 sm:grid-cols-3">
                          {budgets.map((b) => <Choice key={b} on={d.budget === b} onClick={() => set("budget", d.budget === b ? "" : b)}>{b}</Choice>)}
                        </div>
                        <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-cream-mute">Preferred go-live <span className="normal-case tracking-normal">(optional)</span></div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {timelines.map((t) => (
                            <button key={t} type="button" aria-pressed={d.timeline === t} onClick={() => set("timeline", d.timeline === t ? "" : t)}
                              className={cn("rounded-lg border bg-ink-2 px-3 py-2 max-md:py-2.5 text-[12px] transition-all hover:-translate-y-0.5", d.timeline === t ? "border-teal bg-teal/15" : "border-line hover:border-cream/40")}>{t}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <h3 className="text-2xl max-md:text-xl font-bold tracking-[-0.04em]">Book a live demo?</h3>
                        <p className="mt-2 text-[12px] text-cream-mute">Optional. We confirm the time by email or phone.</p>
                        <div className="mt-6 max-md:mt-4 grid gap-3 max-md:gap-2 sm:grid-cols-2">
                          <Choice on={!wantCall} onClick={() => { setWantCall(false); set("call", null); }}>No call, reply by email</Choice>
                          <Choice on={wantCall} onClick={() => { setWantCall(true); set("call", d.call ?? { date: "", slot: slots[0] }); }}>Yes, book a call</Choice>
                        </div>
                        <AnimatePresence>
                          {wantCall && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                              <div className="mt-6 max-md:mt-4 grid gap-4 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="cd" className="text-[11px] uppercase tracking-[0.18em] text-cream-mute">Preferred date</label>
                                  <input id="cd" type="date" min={tomorrow} value={d.call?.date ?? ""} onChange={(e) => set("call", { date: e.target.value, slot: d.call?.slot ?? slots[0] })}
                                    className="h-12 border border-line bg-ink px-4 text-sm max-md:text-base outline-none [color-scheme:dark] focus:border-teal" />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="cs" className="text-[11px] uppercase tracking-[0.18em] text-cream-mute">Preferred time</label>
                                  <select id="cs" value={d.call?.slot ?? slots[0]} onChange={(e) => set("call", { date: d.call?.date ?? "", slot: e.target.value })}
                                    className="h-12 border border-line bg-ink px-4 text-sm max-md:text-base outline-none focus:border-teal">
                                    {slots.map((s) => <option key={s}>{s}</option>)}
                                  </select>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    {step === 4 && (
                      <div>
                        <h3 className="text-2xl max-md:text-xl font-bold tracking-[-0.04em]">Who should we reply to?</h3>
                        <div className="mt-6 max-md:mt-4 grid gap-4 sm:grid-cols-2">
                          <Field id="n" label="Full name *" required maxLength={limits.name} value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                          <Field id="c" label="Company" maxLength={limits.company} value={d.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
                          <Field id="e" label="Email *" type="email" required maxLength={limits.email} value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                          <Field id="p" label="Phone *" type="tel" required maxLength={limits.phone} placeholder="01XXXXXXXXX" inputMode="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
                        </div>
                        <p className="mt-5 font-sans text-[13px] text-cream-dim">No commitment. We use your details only to reply to this inquiry (<a href="/privacy" className="underline underline-offset-4 hover:text-cream">privacy notice</a>). Fields marked * are required.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div role="alert" className="min-h-6 pt-2 text-[13px] text-teal-glow">{err}</div>
                <div className="mt-4 flex items-center justify-between">
                  <Button type="button" variant="ghost" className={cn(step === 0 && "invisible")} onClick={() => { setErr(""); setStep(step - 1); }}>
                    <ArrowLeft size={14} aria-hidden /> Back
                  </Button>
                  <Button type="submit" disabled={busy}>
                    {busy ? "Sending…" : step === 4 ? "Request demo" : "Continue"} <ArrowRight size={14} aria-hidden />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
