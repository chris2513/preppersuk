# Technical & Product Specification: "Beyond 72 Hours" UK Survival Handbook Funnel & Storefront

## 1. Project Overview & Core Objectives
Build a high-converting, blazing-fast direct-response digital product storefront and lead-capture funnel for **"Beyond 72 Hours: The UK Household Survival & Resilience Handbook"** (`Beyond_72_Hours_UK_Prepper_Guide.pdf`).

### Primary Goals
1. **Direct PDF Sales (Paid Ad Conversion):** Convert cold and warm social media ad traffic (Meta, TikTok, X, Google) into instant buyers via Stripe Checkout.
2. **Email Lead Capture (Autoresponder Integration):** Capture emails from visitors who are not ready to buy immediately (via a free "1-Page UK Government 'Be Ready' vs. Reality Quick-Start Checklist" lead magnet and exit-intent/mid-page opt-in), and automatically sync buyers into a post-purchase customer list.
3. **Organic UK Search Visibility (SEO):** Rank for high-intent, trending UK preparedness search queries (e.g., *"UK government 72 hour checklist"*, *"Be Ready UK emergency kit list"*, *"UK prepper beginner guide"*, *"how to prepare for power cuts and water shut off UK"*).

---

## 2. Tech Stack & Hosting Architecture
- **Framework:** SvelteKit (Svelte 5 / latest stable SvelteKit) with TypeScript.
- **Adapter:** `@sveltejs/adapter-cloudflare` configured for **Cloudflare Pages** (Edge Functions / Workers runtime).
  - *Important Edge Constraint:* All server routes (`+server.ts` and `+page.server.ts`) must run on the Cloudflare Workers V8 runtime (use native `fetch` or Stripe's subtle-crypto / fetch client `stripe.createSubtleCryptoProvider()`; do not rely on Node-only `fs` or `http` primitives at runtime).
- **Styling:** Tailwind CSS configured with the exact **SAS Survival Handbook** tactical design tokens from `Beyond_72_Hours_UK_Prepper_Guide.html`.
- **Payments:** **Stripe Checkout** (Hosted Session or Embedded Checkout) + Stripe Webhook handler (`/api/stripe/webhook`) for secure fulfilment and buyer email tagging.
- **Email Autoresponder:** Pluggable provider service (`src/lib/server/email.ts`) supporting HTTP REST APIs compatible with Cloudflare Workers (**Resend / Loops / MailerLite / ConvertKit (Kit) / Brevo**) via environment variables, plus an optional Cloudflare KV/D1 fallback log so zero leads are ever lost if an API key is rotated.
- **PDF Delivery:** Secure signed token download route (`/api/download?session_id=...` or signed HMAC link emailed to the customer) serving `Beyond_72_Hours_UK_Prepper_Guide.pdf` from private static/R2/asset storage after verifying `checkout.session.completed` / `payment_status === 'paid'`.

---

## 3. Visual Design System (Matching `Beyond_72_Hours_UK_Prepper_Guide.pdf`)
The website must look like the digital companion to the **SAS Survival Handbook**-styled PDF located in this repository (`Beyond_72_Hours_UK_Prepper_Guide.pdf` / `Beyond_72_Hours_UK_Prepper_Guide.html`).

### Tone & Positioning
- **"Prepared, Not Panicked":** Authoritative British civil-resilience field manual aesthetic. Calm, practical, family-focused, with grounded urgency around UK "Just-In-Time" supply chains and recent UK utility disruptions (Storm Arwen, Brixham water outage, Cabinet Office "Be Ready" 72-hour alert).

### Colour Palette (Tailwind Custom Tokens)
- `camo-dark`: `#07190C` (Deep forest night — primary dark hero/section background)
- `camo-mid`: `#0E2B16` (Tactical dark green — cards, banners, table headers)
- `camo-olive`: `#173D20` (Woodland olive — borders, secondary surfaces)
- `camo-leaf`: `#1F4E29` (Camo SVG blob accent)
- `sas-orange`: `#FF8C1A` (High-vis survival orange — primary CTAs, stencil headlines, top badges, section borders)
- `sas-orange-hover`: `#FFA033`
- `sas-orange-tint`: `#FFF4E5` (Amber warning callout background)
- `sas-red`: `#D9261C` (Tactical bracket callout & Immediate Action Drill header red)
- `sas-red-tint`: `#FDECEB` (Red alert callout background)
- `paper-light`: `#F4F7F4` (Clean field-manual interior section background for high readability)
- `ink`: `#111812` (Body copy on light backgrounds)

### Typography & Signature Visual Elements
- **Display / Stencil Headings:** Load Google Fonts `Black Ops One` (or `Stardos Stencil`) for giant stencil hero titles + `Oswald` or `Barlow Condensed` (700/800 weight, uppercase, tracked out) for tactical banners, matching `Impact` / `DIN Condensed` from the PDF.
- **Body Font:** `Inter` or `Plus Jakarta Sans` (`16px`–`18px` desktop, generous `1.65` line height).
- **Signature Motifs to Port Directly from `Beyond_72_Hours_UK_Prepper_Guide.html`:**
  1. **Woodland Camouflage SVG Background** in the Hero and Final CTA sections.
  2. **Tilted Red-Bracketed Callout Box** (`-2deg` to `-4deg` rotation on desktop, red corner brackets with tick marks: `[ THE ULTIMATE GUIDE TO PROTECTING YOUR HOME BEYOND 72 HOURS ]`).
  3. **Tactical Module Header Bars:** Dark green (`#0E2B16`) banner with a `4px` bottom border in `#FF8C1A` and mono/condensed uppercase labels (`BRIEFING 01 // THE 72-HOUR BLIND SPOT`).
  4. **Immediate Action Drill (IAD) Preview Cards:** Dark green/black box with a `9px` left border in `#D9261C` and a solid red top header bar.

---

## 4. Site Map & Page Specifications

### 4.1 Landing Page (`src/routes/+page.svelte`)
Designed for maximum conversion from paid social ads AND organic search visitors:

1. **Sticky Urgency Top Bar:**
   - High-vis orange (`#FF8C1A`) strip with dark text: *"UK GOV 'BE READY' UPDATE: Why 72 Hours Is Not Enough — Instant PDF Field Manual Download (£14.99)"* + sticky "Get The Handbook" jump/checkout button.
2. **Hero Section (Above the Fold):**
   - Woodland camo SVG background (`#07190C` / `#13381B`).
   - Top kicker: *"FEATURING THE OFFICIAL UK 'BE READY' 72-HOUR CHECKLIST + 14-DAY SURVIVAL PROTOCOLS"*.
   - Headline: **"BEYOND 72 HOURS: THE UK HOUSEHOLD SURVIVAL HANDBOOK"** — *"The Calm, Practical Beginner's Guide to Protecting Your Home & Family When the Water Stops, the Grid Goes Dark, and the Supermarkets Empty."*
   - **3D Book / A4 Field Manual Mockup** rendering the actual cover of `Beyond_72_Hours_UK_Prepper_Guide.pdf`.
   - **Primary CTA Button:** High-vis orange button (`"DOWNLOAD THE 20-PAGE FIELD MANUAL NOW — £14.99"`) triggering instant Stripe Checkout + trust badges (*Instant PDF + Printable Checklists • One-Time Payment • Secure Stripe Checkout*).
   - **Secondary Lead Magnet Trigger:** *"Not ready to buy? Get the Free 1-Page UK Gov 72-Hour Checklist Audit sent to your inbox."*
3. **The Hook / Problem Agitation Section ("Why Everyone Is Talking About the 3-Day Warning"):**
   - Explains the Cabinet Office `beready.campaign.gov.uk` 72-hour guidance and why 3 days is a starting line, not a finish line.
   - Highlights real UK precedents: **Storm Arwen** (5–12 days without power/heating), **Brixham & Freeze-Thaw Water Outages** (weeks without tap water), and **48-Hour "Just-In-Time" Supermarket Shelves**.
4. **The 5 Critical Blind Spots Comparison Table:**
   - Side-by-side comparison of **Official UK Gov "Be Ready" (3 Days)** vs. **The "Beyond 72 Hours" Handbook Upgrade (14 Days)**:
     1. *The UK Gas Boiler Trap:* Why 95% of UK gas combi boilers die the second electricity cuts out.
     2. *The Unflushable Toilet Crisis:* What happens on Day 1 when mains water stops and you can't waste 9L of drinking water per flush.
     3. *The 60-Minute Mobile Mast Blackout:* Why 4G/5G and Digital Voice landlines fail rapidly in a regional power cut.
     4. *The "Quiet Pantry" (OAR System):* How to build 14 days of normal supermarket food with £0 wasted on expiry dates.
     5. *Water Beyond Plastic Bottles:* Hidden safe vs. lethal water sources in a British home + 2-stage filtration.
5. **Inside the 20-Page Handbook (Module-by-Module Breakdown + Sneak Peek):**
   - Interactive or scrollytelling grid showcasing all **8 Operational Modules**, the **7 Immediate Action Drills (IADs)** (with a blurred/partial preview of *Drill 02: Sudden Mains Water Loss* and *Drill 04: Winter Blackout & Heating Loss*), and the **2 Tear-Out Printable Worksheets** (Master Checklist + Cupboard Emergency Reference Sheet).
6. **Mid-Page Email Capture Banner (Lead Magnet):**
   - High-contrast tactical box offering the **"Free 72-Hour Home Utility & Stopcock Audit Sheet"** in exchange for First Name + Email.
7. **Who This Is For / "Prepared, Not Panicked" Guarantee:**
   - Reassures beginners (parents, flat renters, homeowners, older Britons) that this requires zero survivalist gear, zero bunkers, and can be built on **£12–£15 a week** during a normal Aldi/Tesco shop.
8. **Pricing & Instant Checkout Card:**
   - Clear value stack showing everything included (20-Page A4 PDF Manual + 7 Immediate Action Drills + Printable Master Audit Checklist + Fill-In Family Emergency Plan) for a single impulse-friendly price (configurable via env var, e.g. **£14.99** reduced from £27.00).
9. **SEO-Rich FAQ Accordion (With `FAQPage` JSON-LD Schema):**
   - Answers top UK search questions (*"What is on the official UK government Be Ready checklist?"*, *"Do gas boilers work in a power cut in the UK?"*, *"How much water should I store per person in the UK?"*, *"How can I prepare on a tight budget in a small flat?"*, *"How do I receive the PDF after paying?"*).

### 4.2 Post-Purchase Success & Instant Download Page (`src/routes/success/+page.svelte` & `+page.server.ts`)
- Reads `session_id` from URL query parameters (`?session_id=cs_...`).
- Server-side verifies the Stripe Checkout session status (`payment_status === 'paid'`).
- Displays an immediate, prominent **"DOWNLOAD YOUR HANDBOOK (PDF)"** button + **"DOWNLOAD EDITABLE WORKBOOK (.DOCX)"** bonus button.
- Fires conversion events (Meta Pixel `Purchase`, Google Tag `purchase`, TikTok `CompletePayment` if configured).
- Confirms that a backup download link has been sent to their email address via the autoresponder.

### 4.3 SEO Content Hub / Pillar Guides (`src/routes/guides/+page.svelte` & `src/routes/guides/[slug]/+page.svelte`)
To capture free organic search traffic alongside paid ads, include a lightweight markdown/component-backed `/guides` directory with 3 pre-built, high-ranking UK SEO articles that funnel readers into the email list and paid PDF:
1. `/guides/uk-government-be-ready-72-hour-checklist-explained` — *"The Official UK Government 72-Hour 'Be Ready' Checklist Explained (And What It Leaves Out)"*
2. `/guides/do-uk-gas-boilers-work-in-a-power-cut` — *"Do Gas Boilers Work in a Power Cut? How to Keep Your UK Home Warm Off-Grid"*
3. `/guides/emergency-water-storage-uk-homes-flats` — *"Emergency Water Storage & Filtration for UK Homes and Flats: The Complete Guide"*

### 4.4 Legal & Trust Pages (Required for Meta/Google Ad Approval & Stripe Compliance)
- `/privacy` (UK GDPR & Cookie notice)
- `/terms` (Terms of Sale, digital product refund policy, and practical preparedness disclaimer)
- `/contact` (Customer support email & order lookup help)

---

## 5. Backend API & Integration Specifications

### 5.1 `POST /api/checkout` (`src/routes/api/checkout/+server.ts`)
- Creates a Stripe Checkout Session in `payment` mode for `Beyond_72_Hours_UK_Prepper_Guide.pdf` (currency: `gbp`).
- Optionally accepts an email address if pre-captured so Stripe pre-fills it.
- Sets `success_url: ${PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}` and `cancel_url: ${PUBLIC_SITE_URL}/#pricing`.
- Enables Stripe Promotion Codes (`allow_promotion_codes: true`).

### 5.2 `POST /api/stripe/webhook` (`src/routes/api/stripe/webhook/+server.ts`)
- Verifies the Stripe signature (`stripe-signature` header) using `STRIPE_WEBHOOK_SECRET` and Web Crypto (`stripe.webhooks.constructEventAsync`).
- On `checkout.session.completed`:
  1. Extracts `customer_details.email` and `customer_details.name`.
  2. Calls the Autoresponder service (`subscribeOrUpdateContact`) with tag `customer_beyond_72_hours` and triggers the transactional/welcome email containing the backup download link.

### 5.3 `POST /api/subscribe` (`src/routes/api/subscribe/+server.ts`)
- Validates `email` (and optional `firstName`, `source`, `utm_*` parameters).
- Includes honeypot spam protection + basic rate limiting.
- Adds the subscriber to the configured Email Autoresponder list/audience with tag `lead_72hr_audit`.
- Returns `{ success: true }` so the UI can immediately unlock/send the free 1-page lead magnet teaser.

### 5.4 `GET /api/download` (`src/routes/api/download/+server.ts`)
- Verifies a valid paid `session_id` (via Stripe API) OR a valid HMAC-signed download token (`?token=...&expires=...`).
- Streams `Beyond_72_Hours_UK_Prepper_Guide.pdf` with `Content-Type: application/pdf` and `Content-Disposition: attachment; filename="Beyond_72_Hours_UK_Prepper_Guide.pdf"`.

---

## 6. SEO, Analytics & Ad-Traffic Optimisation Requirements
- **Technical SEO:**
  - Dynamic `<svelte:head>` metadata on every route (Title, Description, Canonical URL, OpenGraph `og:image`, Twitter Card `summary_large_image`, `en_GB` locale).
  - Structured Data (`application/ld+json`): `Product` schema (with GBP price & availability), `Book` / `DigitalDocument` schema, `FAQPage` schema on the landing page, and `Article` schema on `/guides/[slug]`.
  - Auto-generated `/sitemap.xml` and `/robots.txt` routes.
- **Ad Tracking & Attribution Ready:**
  - Capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, and `gclid` in session/localStorage on landing and pass them into Stripe Checkout `metadata` and Autoresponder custom fields so the site owner knows exactly which ad creative generated each lead and sale.
- **Performance Targets:**
  - Lighthouse 95+ across Performance, Accessibility, Best Practices, and SEO.

---

## 7. Environment Variables (`.env.example`)
```env
PUBLIC_SITE_URL=https://your-domain.co.uk
PUBLIC_PRODUCT_PRICE_GBP=14.99
PUBLIC_COMPARE_AT_PRICE_GBP=27.00

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_... # Or dynamic price_data fallback if STRIPE_PRICE_ID is not set

# Download Signing Secret
DOWNLOAD_HMAC_SECRET=replace_with_32_char_random_secret

# Email Autoresponder (Supports Resend / MailerLite / ConvertKit / Loops / Brevo)
EMAIL_PROVIDER=mailerlite # mailerlite | convertkit | resend | loops | brevo
EMAIL_API_KEY=...
EMAIL_LIST_ID_LEADS=...
EMAIL_LIST_ID_BUYERS=...
EMAIL_FROM_ADDRESS=support@your-domain.co.uk

# Optional Ad Pixels
PUBLIC_META_PIXEL_ID=
PUBLIC_GA_MEASUREMENT_ID=
PUBLIC_TIKTOK_PIXEL_ID=
```

---

## 8. Acceptance Criteria Checklist
- [ ] `npm run build` succeeds cleanly with `@sveltejs/adapter-cloudflare`.
- [ ] Visual theme faithfully matches the woodland camo, stencil typography, high-vis orange (`#FF8C1A`), and red-bracketed callout boxes of `Beyond_72_Hours_UK_Prepper_Guide.pdf`.
- [ ] Clicking any Buy CTA initiates a Stripe Checkout session and redirects to `/success?session_id=...`, where paid buyers can immediately download `Beyond_72_Hours_UK_Prepper_Guide.pdf`.
- [ ] Submitting any email opt-in form validates the email, sends it to `/api/subscribe` (autoresponder integration), and shows clear confirmation feedback.
- [ ] `/sitemap.xml`, `/robots.txt`, JSON-LD schemas (`Product`, `FAQPage`, `Article`), and the 3 SEO pillar guides under `/guides/*` are live and indexable.
