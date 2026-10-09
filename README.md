# PETRA — hospitality software website · build v2.6

Next.js 16 (App Router, RSC) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Lucide.
Montserrat throughout (self-hosted via Fontsource).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run check                # typecheck + lint + production build
npm start                    # serve the production build
```

Requires Node.js 20.9 or newer.

## Page structure
Hero → Trust band → 01 Company overview → 02 Products (PMS, POS, DMS, each with a "How it works" workflow) →
03 Ecosystem → 04 Deployment → 05 Industries → 06 Why Petra → 07 Implementation → 08 Book a demo → Footer.
`/privacy` holds the privacy notice for the demo form.

## Release status (keep it honest)
Every product, integration and module carries a status defined in `src/types/content.ts`:

| Status | Meaning | Where to change it |
|---|---|---|
| `available` | Released and sold today | `status` in `src/content/products.ts` |
| `preview` | Working software or interface, shown in demos | same |
| `planned` | On the roadmap, not built yet | `src/content/ecosystem.ts`, feature `planned: true`, `src/content/industries.ts` |

When a product is released, set its `status` to `"available"`. When an integration ships, set its relation to `"available"` in `src/content/ecosystem.ts`.
Screenshot labels come from `screenSource` (`illustrative`, `prototype` or `live`). Use `live` only for captures of the real, running product.

## Where to edit
- `src/content/` all copy: products, ecosystem, industries, why-Petra, trust band, deployment, implementation, inquiry options.
- `src/features/<section>/` one folder per section; `src/shared/status.tsx` the status chip; `src/components/ui/device-frame.tsx` device frames.
- `src/app/api/inquiry/route.ts` the demo-request endpoint.

## Production configuration
| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL, sitemap, robots, Open Graph, structured data. The build prints a warning when it is missing. |
| `INQUIRY_WEBHOOK_URL` | yes | Where demo requests are delivered (Slack, Zapier, Make, CRM or your own endpoint). **Without it, requests are not stored anywhere**; visitors get a reference and a pre-filled email button instead. Must be `https` in production. |
| `INQUIRY_WEBHOOK_SECRET` | recommended | Adds `x-petra-signature: sha256=<HMAC of the body>` so the receiver can verify requests. |

The inquiry API validates every field against the same option lists as the form, caps the body at 16 KB, rate-limits to 5 requests per IP per 10 minutes (in memory, per instance), keeps the honeypot, times out the webhook after 8 s, and logs only the reference and delivery status (no names, emails or phone numbers).

## Images
- `public/products/*.webp` product screenshots, `public/og.png` (1200×630) and are generated (`public/logo.png` is the supplied brand logo, not generated):
  ```bash
  pip install playwright pillow && python3 scripts/capture.py        # everything
  python3 scripts/capture.py og                                     # only the OG image and logo
  ```
- `mockups/petradms.html` is the supplied PetraDMS prototype, captured unmodified. `mockups/petrapms.html` and `mockups/petrapos.html` are illustrative interfaces; the site labels them "Product preview · Interface shown for demonstration".
- When real PetraPMS or PetraPOS screens exist, capture them, set `screenSource: "live"` and update the alt text.
