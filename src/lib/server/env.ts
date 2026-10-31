export type Env = Record<string, string | undefined> & {
	DOWNLOADS?: R2Bucket;
	LEADS_KV?: KVNamespace;
};

/**
 * Cloudflare bindings/secrets/vars come from platform.env. In local dev the adapter's platform proxy
 * loads them from .dev.vars (and wrangler.toml [vars]). process.env is a last-resort fallback for
 * non-Cloudflare tooling and is guarded so it never throws on Workers.
 */
export function getEnv(platform?: App.Platform): Env {
	const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
	return { ...proc, ...((platform?.env as Env | undefined) ?? {}) } as Env;
}

export const PRODUCT = {
	name: 'Beyond 72 Hours: The UK Household Survival & Resilience Handbook',
	pdf: 'Beyond_72_Hours_UK_Prepper_Guide.pdf'
} as const;

export function siteUrl(env: Env, fallbackOrigin: string): string {
	return (env.PUBLIC_SITE_URL && !env.PUBLIC_SITE_URL.includes('your-domain')
		? env.PUBLIC_SITE_URL
		: fallbackOrigin
	).replace(/\/$/, '');
}

export function priceGBP(env: Env): number {
	const n = parseFloat(env.PUBLIC_PRODUCT_PRICE_GBP ?? '7.00');
	return Number.isFinite(n) ? n : 7;
}
