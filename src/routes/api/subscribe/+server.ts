import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEnv } from '$lib/server/env';
import { subscribeOrUpdateContact, TAGS } from '$lib/server/email';
import { sanitizeUtm } from '$lib/utm';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-isolate rate limit (5 requests / 10 min / IP).
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
	recent.push(now);
	hits.set(ip, recent);
	if (hits.size > 5000) hits.clear();
	return recent.length > 5;
}

export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
	const env = getEnv(platform);
	let data: Record<string, unknown>;
	try {
		data = await request.json();
	} catch {
		return json({ success: false, error: 'Invalid request.' }, { status: 400 });
	}

	// Honeypot: bots fill the hidden field. Pretend success.
	if (typeof data.website === 'string' && data.website.trim() !== '') return json({ success: true });

	let ip = 'unknown';
	try {
		ip = request.headers.get('cf-connecting-ip') ?? getClientAddress();
	} catch {
		/* ignore */
	}
	if (limited(ip)) return json({ success: false, error: 'Too many attempts. Please try again shortly.' }, { status: 429 });

	const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
	if (!EMAIL_RE.test(email) || email.length > 254) {
		return json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
	}
	const firstName = typeof data.firstName === 'string' ? data.firstName.trim().slice(0, 60) : undefined;
	const source = typeof data.source === 'string' ? data.source.slice(0, 60) : 'unknown';
	const utm = sanitizeUtm(data.utm);

	const res = await subscribeOrUpdateContact(env, {
		email,
		firstName,
		tag: TAGS.lead,
		list: 'leads',
		fields: { source, ...utm }
	});
	if (!res.ok) {
		return json({ success: false, error: 'We could not save your details. Please try again.' }, { status: 502 });
	}
	return json({ success: true, mock: res.mock ?? false });
};
