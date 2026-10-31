import type { Env } from './env';

const enc = new TextEncoder();

function b64url(buf: ArrayBuffer): string {
	let s = '';
	for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
	return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function hmacSecret(env: Env): string {
	if (env.DOWNLOAD_HMAC_SECRET) return env.DOWNLOAD_HMAC_SECRET;
	// Only tolerated in local demo mode (no Stripe key). Production must set the secret.
	if (!env.STRIPE_SECRET_KEY) return 'local-demo-secret-not-for-production';
	throw new Error('DOWNLOAD_HMAC_SECRET is not set');
}

async function key(secret: string) {
	return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
		'sign',
		'verify'
	]);
}

export async function signDownload(env: Env, ref: string, expires: number): Promise<string> {
	const sig = await crypto.subtle.sign('HMAC', await key(hmacSecret(env)), enc.encode(`${ref}.${expires}`));
	return b64url(sig);
}

export async function verifyDownload(env: Env, ref: string, expires: number, token: string): Promise<boolean> {
	if (!Number.isFinite(expires) || expires < Date.now() / 1000) return false;
	const expected = await signDownload(env, ref, expires);
	if (expected.length !== token.length) return false;
	let diff = 0;
	for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
	return diff === 0;
}

/** Build a signed, expiring download URL (default 7 days). */
export async function buildDownloadUrl(
	env: Env,
	origin: string,
	ref: string,
	file: 'pdf' = 'pdf',
	ttlSeconds = 7 * 24 * 3600
): Promise<string> {
	const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
	const token = await signDownload(env, ref, expires);
	const u = new URL('/api/download', origin);
	u.searchParams.set('ref', ref);
	u.searchParams.set('file', file);
	u.searchParams.set('expires', String(expires));
	u.searchParams.set('token', token);
	return u.toString();
}
