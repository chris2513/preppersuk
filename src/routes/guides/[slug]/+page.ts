import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getGuide } from '$lib/content';

export const load: PageLoad = ({ params }) => {
	const guide = getGuide(params.slug);
	if (!guide) throw error(404, 'Guide not found');
	return { guide };
};
