import type { LayoutServerLoad } from './$types';
import { getEnv, siteUrl } from '$lib/server/env';

export const load: LayoutServerLoad = ({ platform, url }) => {
	const env = getEnv(platform);
	const price = parseFloat(env.PUBLIC_PRODUCT_PRICE_GBP ?? '7.00') || 7;
	const compareAt = parseFloat(env.PUBLIC_COMPARE_AT_PRICE_GBP ?? '') || 0;
	return {
		site: siteUrl(env, url.origin),
		price,
		compareAt,
		priceText: price.toFixed(2),
		compareText: compareAt.toFixed(2),
		showCompare: compareAt > price,
		support: env.PUBLIC_SUPPORT_EMAIL || 'support@your-domain.co.uk',
		pixels: {
			meta: env.PUBLIC_META_PIXEL_ID || '',
			ga: env.PUBLIC_GA_MEASUREMENT_ID || '',
			tiktok: env.PUBLIC_TIKTOK_PIXEL_ID || ''
		}
	};
};
