# Coding Agent Prompt

```text
You are a senior full-stack SvelteKit engineer and conversion-focused frontend designer. Your task is to build the complete web storefront, lead-capture funnel, and SEO content site for our digital info product: "Beyond 72 Hours: The UK Household Survival & Resilience Handbook".

### 1. First Step — Read the Project Files
Before writing any code, read these two files in the workspace root (`/Users/chris/Documents/projects/Side_Projects/preppersUK/`):
1. `SITE_SPEC.md` — Contains the complete technical architecture, route map, API specifications, SEO requirements, environment variables, and acceptance criteria.
2. `Beyond_72_Hours_UK_Prepper_Guide.html` (the master source for `Beyond_72_Hours_UK_Prepper_Guide.pdf`) — Inspect its exact CSS variables, woodland camouflage SVG background, distressed military stencil typography, high-vis survival orange (`#FF8C1A`), dark forest greens (`#07190C` / `#0E2B16`), red-bracketed callout boxes (`#D9261C`), chapter briefings, and Immediate Action Drills.

### 2. Tech Stack & Hosting Constraints
- **Framework:** SvelteKit (latest stable) with TypeScript and Tailwind CSS.
- **Deployment Target:** Cloudflare Pages using `@sveltejs/adapter-cloudflare`.
- **Edge Runtime Compatibility:** Every server route (`+server.ts` / `+page.server.ts`) MUST be 100% compatible with the Cloudflare Workers V8 runtime. Use native `fetch` and Web Crypto (`crypto.subtle`) — do not use Node-only APIs that break on Cloudflare Pages. Configure `wrangler.toml` / SvelteKit config cleanly.
- **Preserve Existing Product Files:** Do NOT delete or overwrite `Beyond_72_Hours_UK_Prepper_Guide.pdf`, `Beyond_72_Hours_UK_Prepper_Guide.doc`, `Beyond_72_Hours_UK_Prepper_Guide.docx`, `Beyond_72_Hours_UK_Prepper_Guide.html`, or `SITE_SPEC.md`. Place or reference the PDF so it can be securely served to verified buyers via `/api/download`.

### 3. Core Features to Implement
1. **High-Converting Landing Page (`/`):**
   - Styled to match the **SAS Survival Handbook** look and feel of `Beyond_72_Hours_UK_Prepper_Guide.pdf` (woodland camo SVG hero background, giant stencil `UK SURVIVAL HANDBOOK` typography, tilted red-bracketed callout banner, tactical module headers, and clean high-readability field-manual sections).
   - Built for paid social ad traffic (fast load, sticky urgency bar, clear above-the-fold CTA, 3D/A4 handbook cover visual, "UK Gov 3-Day 'Be Ready' vs. 14-Day Reality" comparison table, sneak peek of the 8 Modules & 7 Immediate Action Drills, £12–£15/wk budget breakdown, pricing card, and FAQ accordion).
   - Captures UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, `gclid`) and passes them through to Stripe Checkout metadata and the Email Autoresponder.

2. **Email Lead Capture & Autoresponder Integration (`POST /api/subscribe`):**
   - Build a clean, pluggable server-side email autoresponder adapter (`src/lib/server/email.ts`) that works over `fetch` on Cloudflare Workers and supports MailerLite, ConvertKit (Kit), Resend, Loops, or Brevo via environment variables (with a graceful dev/mock mode when API keys are not yet set so local testing works out of the box).
   - Include high-converting email opt-in forms (Hero modal/inline option + Mid-page "Free 1-Page UK Gov 72-Hour Utility & Stopcock Audit Sheet" lead magnet) with client and server validation, loading states, and honeypot spam protection.

3. **Stripe Checkout & Secure PDF Delivery (`POST /api/checkout`, `POST /api/stripe/webhook`, `GET /api/download`, `/success`):**
   - Implement `POST /api/checkout` to create a GBP Stripe Checkout Session (supporting either a pre-configured `STRIPE_PRICE_ID` or dynamic `price_data` fallback using `PUBLIC_PRODUCT_PRICE_GBP`), plus a graceful demo/test fallback note if `STRIPE_SECRET_KEY` is missing during local preview.
   - Implement `POST /api/stripe/webhook` using Web Crypto signature verification (`constructEventAsync`) to handle `checkout.session.completed`, tag the buyer in the autoresponder (`customer_beyond_72_hours`), and send their backup download link.
   - Implement `/success` to verify the paid session and provide immediate one-click downloads for `Beyond_72_Hours_UK_Prepper_Guide.pdf` (and bonus `.docx` workbook) via `GET /api/download` (protected by session verification or a Web Crypto HMAC-signed token).

4. **SEO Architecture & Organic Traffic Hub (`/guides`, `/guides/[slug]`, `/sitemap.xml`, `/robots.txt`):**
   - Implement complete `<svelte:head>` SEO tags (`en_GB`), OpenGraph tags, and JSON-LD structured data (`Product`, `FAQPage`, `Article`).
   - Build the `/guides` hub with the 3 comprehensive UK SEO pillar articles specified in `SITE_SPEC.md`, each containing embedded lead-capture and PDF checkout CTAs.
   - Include `/privacy`, `/terms`, and `/contact` pages so the site is immediately compliant for Meta Ads, Google Ads, TikTok Ads, and Stripe review.

### 4. Verification
After building the application:
1. Run `npm install` and `npm run check` / `npm run build` to verify there are zero TypeScript, Svelte, or Cloudflare adapter build errors.
2. Start the dev server and verify all pages (`/`, `/guides`, `/guides/[slug]`, `/success`, `/privacy`, `/terms`, `/contact`, `/sitemap.xml`) render properly and match the aesthetic of `Beyond_72_Hours_UK_Prepper_Guide.pdf`.
```
