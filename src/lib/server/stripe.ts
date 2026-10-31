import Stripe from 'stripe';
import type { Env } from './env';

export function getStripe(env: Env): Stripe | null {
	if (!env.STRIPE_SECRET_KEY) return null;
	return new Stripe(env.STRIPE_SECRET_KEY, {
		// fetch-based client: required for Cloudflare Workers (no node:http)
		httpClient: Stripe.createFetchHttpClient()
	});
}

export const cryptoProvider = Stripe.createSubtleCryptoProvider();

/** Returns the paid checkout session or null. */
export async function getPaidSession(env: Env, sessionId: string) {
	const stripe = getStripe(env);
	if (!stripe || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return session.payment_status === 'paid' ? session : null;
	} catch {
		return null;
	}
}
