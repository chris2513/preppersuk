<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { guides } from '$lib/content';

	let { data } = $props();
	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: 'UK Household Preparedness Guides',
			url: `${data.site}/guides`
		}
	]);
</script>

<Seo
	title="UK Preparedness Guides: 72-Hour Checklist, Power Cuts & Water | Beyond 72 Hours"
	description="Free, practical UK guides: the government 72-hour 'Be Ready' checklist explained, gas boilers in a power cut, and emergency water storage for UK homes and flats."
	path="/guides"
	site={data.site}
	{jsonLd}
/>

<section class="bg-paper py-14">
	<div class="mx-auto max-w-4xl px-4">
		<div class="module-bar"><span class="l">Field guides</span><span class="r">Free UK preparedness library</span></div>
		<h1 class="font-stencil mt-8 text-4xl text-camo-mid sm:text-5xl">UK Preparedness Guides</h1>
		<p class="mt-3 text-lg text-ink/80">Calm, practical answers to the questions UK households are searching for.</p>
		<div class="mt-8 space-y-5">
			{#each guides as g, i}
				<a href="/guides/{g.slug}" class="block border-2 border-camo-mid bg-white transition hover:-translate-y-1 hover:shadow-xl">
					<div class="module-bar !text-xs"><span class="l">Guide {String(i + 1).padStart(2, '0')}</span><span class="r">{g.readMins} min read</span></div>
					<div class="p-5">
						<h2 class="font-tactical text-xl text-camo-mid">{g.h1}</h2>
						<p class="mt-2 text-ink/80">{g.description}</p>
						<span class="font-tactical mt-3 inline-block text-sas-red">Read the guide →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
