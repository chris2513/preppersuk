import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEnv, siteUrl } from '$lib/server/env';
import { cryptoProvider, getStripe } from '$lib/server/stripe';
import { sendDownloadEmail, subscribeOrUpdateContact, TAGS } from '$lib/server/email';
import { buildDownloadUrl } from '$lib/server/download';

export const POST: RequestHandler = async ({ request, platform, url }) => {
	const env = getEnv(platform);
	const stripe = getStripe(env);
	const secret = env.STRIPE_WEBHOOK_SECRET;
	if (!stripe || !secret) return json({ error: 'Webhook not configured' }, { status: 503 });

	const sig = request.headers.get('stripe-signature');
	if (!sig) return json({ error: 'Missing signature' }, { status: 400 });

	const raw = await request.text();
	let event;
	try {
		event = await stripe.webhooks.constructEventAsync(raw, sig, secret, undefined, cryptoProvider);
	} catch (e) {
		console.error('[webhook] signature verification failed', e);
		return json({ error: 'Invalid signature' }, { status: 400 });
	}

	if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
		const session = event.data.object;
		if (session.payment_status === 'paid') {
			const email = session.customer_details?.email;
			if (email) {
				const name = session.customer_details?.name ?? undefined;
				const firstName = name?.split(' ')[0];
				const base = siteUrl(env, url.origin);
				const downloadUrl = await buildDownloadUrl(env, base, session.id, 'pdf');
				const md = (session.metadata ?? {}) as Record<string, string>;
				const { product: _p, ...utm } = md;

				const sub = await subscribeOrUpdateContact(env, {
					email,
					firstName,
					tag: TAGS.buyer,
					list: 'buyers',
					fields: { source: 'purchase', download_link: downloadUrl, ...utm }
				});
				const mail = await sendDownloadEmail(env, { email, name }, downloadUrl, env.PUBLIC_SUPPORT_EMAIL);
				if (!sub.ok || !mail.ok) {
					// Non-2xx makes Stripe retry delivery.
					return json({ error: 'Fulfilment failed, will retry' }, { status: 500 });
				}
			}
		}
	}
	return json({ received: true });
};
