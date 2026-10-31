import type { RequestHandler } from './$types';
import { getEnv, siteUrl } from '$lib/server/env';
import { guides } from '$lib/content';

export const GET: RequestHandler = ({ platform, url }) => {
	const base = siteUrl(getEnv(platform), url.origin);
	const today = new Date().toISOString().slice(0, 10);
	const entries = [
		{ loc: '/', lastmod: today, priority: '1.0' },
		{ loc: '/guides', lastmod: today, priority: '0.8' },
		...guides.map((g) => ({ loc: `/guides/${g.slug}`, lastmod: g.updated, priority: '0.9' })),
		{ loc: '/privacy', lastmod: today, priority: '0.2' },
		{ loc: '/terms', lastmod: today, priority: '0.2' },
		{ loc: '/contact', lastmod: today, priority: '0.3' }
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${base}${e.loc}</loc><lastmod>${e.lastmod}</lastmod><priority>${e.priority}</priority></url>`).join('\n')}
</urlset>`;
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
	});
};
