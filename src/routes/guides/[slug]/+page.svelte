<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BuyButton from '$lib/components/BuyButton.svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';
	import { guides } from '$lib/content';

	let { data } = $props();
	const g = $derived(data.guide);
	const others = $derived(guides.filter((x) => x.slug !== g.slug));
	const mid = $derived(Math.ceil(g.blocks.length / 2));

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: g.h1,
			description: g.description,
			image: `${data.site}/cover.png`,
			inLanguage: 'en-GB',
			datePublished: g.published,
			dateModified: g.updated,
			mainEntityOfPage: `${data.site}/guides/${g.slug}`,
			author: { '@type': 'Organization', name: 'Beyond 72 Hours' },
			publisher: { '@type': 'Organization', name: 'Beyond 72 Hours' }
		}
	]);
</script>

<Seo title="{g.title} | Beyond 72 Hours" description={g.description} path="/guides/{g.slug}" type="article" site={data.site} {jsonLd} />

<article class="bg-paper py-12">
	<div class="mx-auto max-w-3xl px-4">
		<nav aria-label="Breadcrumb" class="font-tactical mb-4 text-xs text-camo-mid">
			<a href="/guides" class="underline">Guides</a> / <span>{g.readMins} min read</span>
		</nav>
		<div class="module-bar"><span class="l">Field guide</span><span class="r">Updated {g.updated}</span></div>
		<h1 class="font-stencil mt-6 text-3xl leading-tight text-camo-mid sm:text-4xl">{g.h1}</h1>

		<div class="manual mt-4">
			{#each g.blocks as b, i}
				{#if b.h}<h2>{b.h}</h2>{/if}
				{@html b.html}

				{#if i === mid - 1}
					<div class="not-prose my-8 bg-camo-dark p-5 text-white">
						<LeadForm source="guide_{g.slug}" heading="Free: 72-Hour Home Utility & Stopcock Audit Sheet" />
					</div>
				{/if}
			{/each}
		</div>

		<div class="camo-section mt-10 border-4 border-sas-orange p-6 text-center text-white">
			<div class="camo-content">
				<p class="font-stencil text-2xl text-sas-orange">Go beyond 72 hours</p>
				<p class="mx-auto mt-2 max-w-md text-sm text-[#e2ece4]">
					The full 20-page UK field manual: 8 modules, 7 action drills and printable checklists. Instant PDF.
				</p>
				<div class="mt-4"><BuyButton label={`Get the handbook: £${data.priceText}`} /></div>
			</div>
		</div>

		<aside class="mt-10">
			<h2 class="font-tactical text-camo-mid">More guides</h2>
			<ul class="mt-2 list-disc pl-5">
				{#each others as o}<li><a class="font-semibold text-sas-red underline" href="/guides/{o.slug}">{o.h1}</a></li>{/each}
			</ul>
		</aside>
		<p class="mt-8 text-xs text-ink/60">
			General information only, not professional advice. Always follow official guidance from GOV.UK, your utility provider and the emergency services.
		</p>
	</div>
</article>
