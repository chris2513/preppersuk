import type { RequestHandler } from './$types';
import { getEnv, siteUrl } from '$lib/server/env';

export const GET: RequestHandler = ({ platform, url }) => {
	const base = siteUrl(getEnv(platform), url.origin);
	const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /success
Disallow: /_files/

Sitemap: ${base}/sitemap.xml
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};
