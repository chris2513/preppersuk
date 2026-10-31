import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEnv, PRODUCT } from '$lib/server/env';
import { getPaidSession } from '$lib/server/stripe';
import { verifyDownload } from '$lib/server/download';

const TYPES = {
	pdf: { name: PRODUCT.pdf, mime: 'application/pdf' }
} as const;

export const GET: RequestHandler = async ({ url, platform, fetch }) => {
	const env = getEnv(platform);
	const file = TYPES.pdf;

	const sessionId = url.searchParams.get('session_id');
	const token = url.searchParams.get('token');
	const ref = url.searchParams.get('ref');
	const expires = Number(url.searchParams.get('expires'));

	let allowed = false;
	if (token && ref) {
		allowed = await verifyDownload(env, ref, expires, token);
	} else if (sessionId) {
		// Local demo mode only: no Stripe key configured.
		if (!env.STRIPE_SECRET_KEY && sessionId === 'demo_local') allowed = true;
		else allowed = !!(await getPaidSession(env, sessionId));
	}
	if (!allowed) throw error(403, 'Download link is invalid, expired, or payment is not complete.');

	let body: ReadableStream | ArrayBuffer | null = null;
	const r2 = env.DOWNLOADS;
	if (r2) {
		const obj = await r2.get(file.name);
		if (obj) body = obj.body as unknown as ReadableStream;
	}
	if (!body) {
		// Fallback: bundled static copy (see README – use R2 in production for private storage).
		const res = await fetch(`/_files/${file.name}`);
		if (res.ok) body = await res.arrayBuffer();
	}
	if (!body) throw error(404, 'File not found. Please contact support.');

	return new Response(body, {
		headers: {
			'Content-Type': file.mime,
			'Content-Disposition': `attachment; filename="${file.name}"`,
			'Cache-Control': 'private, no-store',
			'X-Robots-Tag': 'noindex'
		}
	});
};
