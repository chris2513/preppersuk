import type { PageServerLoad } from './$types';
import { getEnv } from '$lib/server/env';
import { getPaidSession } from '$lib/server/stripe';
import { buildDownloadUrl } from '$lib/server/download';

export const load: PageServerLoad = async ({ url, platform, setHeaders }) => {
	setHeaders({ 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex' });
	const env = getEnv(platform);
	const sessionId = url.searchParams.get('session_id') ?? '';

	if (!sessionId) return { status: 'missing' as const };

	const demo = !env.STRIPE_SECRET_KEY && sessionId === 'demo_local';
	let email: string | null = null;
	let amount = 0;
	if (!demo) {
		const session = await getPaidSession(env, sessionId);
		if (!session) return { status: 'unpaid' as const };
		email = session.customer_details?.email ?? null;
		amount = (session.amount_total ?? 0) / 100;
	}

	const origin = url.origin;
	const pdf = await buildDownloadUrl(env, origin, sessionId, 'pdf', 24 * 3600);
	// Relative paths so links work on any host
	const rel = (u: string) => {
		const x = new URL(u);
		return x.pathname + x.search;
	};
	return {
		status: 'paid' as const,
		demo,
		email,
		amount,
		sessionId,
		pdf: rel(pdf)
	};
};
