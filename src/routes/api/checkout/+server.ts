import { json } from '@sveltejs/kit';
import type Stripe from 'stripe';
import type { RequestHandler } from './$types';
import { getEnv, priceGBP, siteUrl, PRODUCT } from '$lib/server/env';
import { getStripe } from '$lib/server/stripe';
import { sanitizeUtm } from '$lib/utm';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Managed Payments requires this preview API version on the Checkout Session request.
const MANAGED_PAYMENTS_API_VERSION = '2026-02-25.preview';
// Eligible digital-product tax code (e-books / digital documents).
const DIGITAL_PRODUCT_TAX_CODE = 'txcd_10103100';

export const POST: RequestHandler = async ({ request, platform, url }) => {
	const env = getEnv(platform);
	const body = (await request.json().catch(() => ({}))) as { email?: string; utm?: unknown };
	const email = typeof body.email === 'string' && EMAIL_RE.test(body.email.trim()) ? body.email.trim() : undefined;
	const utm = sanitizeUtm(body.utm);
	const base = siteUrl(env, url.origin);

	const stripe = getStripe(env);
	if (!stripe) {
		// Demo / local-preview fallback: no Stripe key configured.
		return json({
			demo: true,
			note: 'STRIPE_SECRET_KEY is not set — redirecting to the demo success page (no payment taken).',
			url: `${base}/success?session_id=demo_local`
		});
	}

	try {
		const lineItem = env.STRIPE_PRICE_ID
			? { price: env.STRIPE_PRICE_ID, quantity: 1 }
			: {
					quantity: 1,
					price_data: {
						currency: 'gbp',
						unit_amount: Math.round(priceGBP(env) * 100),
						product_data: {
							name: PRODUCT.name,
							tax_code: DIGITAL_PRODUCT_TAX_CODE,
							description: 'Instant PDF download (20-page A4 field manual + printable checklists)'
						}
					}
				};

		const session = await stripe.checkout.sessions.create(
			{
				mode: 'payment',
				line_items: [lineItem],
				customer_email: email,
				allow_promotion_codes: true,
				success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${base}/#pricing`,
				metadata: { product: 'beyond_72_hours_pdf', ...utm },
				managed_payments: { enabled: true }
				// managed_payments isn't in the SDK's stable types yet
			} as Stripe.Checkout.SessionCreateParams,
			{ apiVersion: MANAGED_PAYMENTS_API_VERSION as Stripe.LatestApiVersion }
		);
		return json({ url: session.url });
	} catch (e) {
		console.error('[checkout]', e);
		return json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
	}
};
