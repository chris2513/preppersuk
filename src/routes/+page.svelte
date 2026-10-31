<script lang="ts">
	import Camo from '$lib/components/Camo.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import BuyButton from '$lib/components/BuyButton.svelte';
	import LeadForm from '$lib/components/LeadForm.svelte';
	import { modules, drills, compare, faqs, includes, budgetWeeks } from '$lib/content';

	let { data } = $props();
	let heroLead = $state(false);
	let openFaq = $state<number | null>(0);

	const title = 'Beyond 72 Hours: UK Household Survival Handbook (PDF) | Prepared, Not Panicked';
	const description =
		'The calm, practical UK beginner’s guide to power cuts, water outages and empty shelves. Official 72-hour "Be Ready" checklist expanded into 14-day protocols, 7 action drills and printable checklists. Instant PDF.';

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: 'Beyond 72 Hours: The UK Household Survival & Resilience Handbook',
			description,
			image: `${data.site}/cover.png`,
			brand: { '@type': 'Brand', name: 'Beyond 72 Hours' },
			offers: {
				'@type': 'Offer',
				url: `${data.site}/#pricing`,
				priceCurrency: 'GBP',
				price: data.priceText,
				availability: 'https://schema.org/InStock',
				itemCondition: 'https://schema.org/NewCondition'
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Book',
			name: 'Beyond 72 Hours: The UK Household Survival & Resilience Handbook',
			inLanguage: 'en-GB',
			bookFormat: 'https://schema.org/EBook',
			numberOfPages: 20,
			image: `${data.site}/cover.png`
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((f) => ({
				'@type': 'Question',
				name: f.q,
				acceptedAnswer: { '@type': 'Answer', text: f.a }
			}))
		}
	]);
</script>

<Seo {title} {description} site={data.site} path="/" type="product" {jsonLd} />

<!-- STICKY URGENCY BAR -->
<div class="sticky top-0 z-40 bg-sas-orange text-camo-dark shadow-lg">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
		<p class="font-tactical text-[11px] leading-tight sm:text-sm">
			UK Gov "Be Ready" update: why 72 hours is not enough. Instant PDF field manual (£{data.priceText})
		</p>
		<a
			href="#pricing"
			class="font-tactical shrink-0 border-2 border-camo-dark bg-camo-dark px-3 py-1.5 text-xs text-sas-orange hover:bg-camo-mid sm:text-sm"
			>Get The Handbook</a
		>
	</div>
</div>

<!-- HERO -->
<section class="camo-section text-white">
	<Camo />
	<div class="camo-content mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 lg:grid-cols-[1.25fr_1fr] lg:pt-16">
		<div class="text-center lg:text-left">
			<p class="font-tactical text-xs text-[#e2ece4] sm:text-sm">
				Featuring the official UK 'Be Ready' 72-hour checklist + 14-day survival protocols
			</p>
			<p class="font-tactical mt-2 text-sas-orange/90 text-xs tracking-[0.5em]">2026 / 2027 EDITION</p>
			<h1 class="mt-4">
				<span class="font-stencil dist block text-[2.6rem] leading-[0.95] text-sas-orange sm:text-6xl lg:text-[4.4rem] whitespace-nowrap">UK SURVIVAL</span>
				<span class="font-stencil dist block text-[2.6rem] leading-[0.95] text-white sm:text-6xl lg:text-[4.4rem] whitespace-nowrap">HANDBOOK</span>
				<span class="font-tactical mt-3 block text-lg text-white sm:text-2xl"
					>Beyond 72 Hours: The UK Household Survival Handbook</span
				>
			</h1>
			<div class="mt-6">
				<div class="bracket-wrap">
					<p class="bracket-text text-sm sm:text-xl">[ The ultimate guide to protecting your home beyond 72 hours ]</p>
				</div>
			</div>
			<p class="mx-auto mt-6 max-w-xl text-base text-[#e2ece4] sm:text-lg lg:mx-0">
				The calm, practical beginner’s guide to protecting your home &amp; family when the water stops, the grid goes
				dark, and the supermarkets empty.
			</p>
			<div class="mt-7 flex flex-col items-center gap-3 lg:items-start">
				<BuyButton
					id="hero-buy"
					class="pulse w-full text-base sm:w-auto sm:text-xl"
					label={`Download the 20-page field manual now: £${data.priceText}`}
				/>
				<ul class="font-tactical flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-[#cfe0d3] lg:justify-start">
					<li>✔ Instant PDF + printable checklists</li>
					<li>✔ One-time payment</li>
					<li>✔ Secure Stripe checkout</li>
				</ul>
				<button
					type="button"
					class="mt-1 text-sm text-sas-orange underline underline-offset-4 hover:text-sas-orange-hover"
					onclick={() => (heroLead = !heroLead)}
					aria-expanded={heroLead}
					aria-controls="hero-lead"
				>
					Not ready to buy? Get the free 1-page UK Gov 72-hour checklist audit by email
				</button>
				{#if heroLead}
					<div id="hero-lead" class="w-full max-w-xl border-2 border-sas-orange bg-camo-dark/90 p-4 text-left">
						<LeadForm source="hero_inline" compact showName={false} button="Send it" />
					</div>
				{/if}
			</div>
		</div>

		<!-- 3D / A4 cover visual -->
		<div class="flex justify-center [perspective:1200px]">
			<div class="relative transition-transform duration-500 [transform:rotateY(-14deg)_rotateX(3deg)] hover:[transform:rotateY(-4deg)_rotateX(0deg)]">
				<img
					src="/cover.png"
					alt="Cover of Beyond 72 Hours: The UK Household Survival Handbook"
					width="450"
					height="637"
					fetchpriority="high"
					class="w-64 border-l-[10px] border-camo-dark shadow-[20px_30px_60px_rgba(0,0,0,0.8)] sm:w-80"
				/>
				<div class="absolute -right-3 -bottom-3 rotate-6 border-2 border-camo-dark bg-sas-red px-3 py-1 font-tactical text-xs text-white shadow-lg">
					PDF · 20 pages · A4
				</div>
			</div>
		</div>
	</div>
</section>

<!-- PROBLEM -->
<section class="bg-paper py-16">
	<div class="mx-auto max-w-4xl px-4">
		<div class="module-bar"><span class="l">Briefing 00 // The 72-hour blind spot</span><span class="r">Situation</span></div>
		<div class="manual">
			<h2>Why everyone is talking about the 3-day warning</h2>
			<p>
				The government’s "Be Ready" guidance asks UK households to be able to cope for around
				<strong>72 hours</strong> without normal services. That is a smart starting line: but it is a starting line, not a
				finish line.
			</p>
			<div class="my-6 grid gap-4 sm:grid-cols-3">
				<div class="border-t-[5px] border-camo-mid bg-white p-4 shadow">
					<p class="font-tactical text-camo-mid">Storm Arwen</p>
					<p class="mt-1 text-sm">Some homes were without power and heating for 5–12 days.</p>
				</div>
				<div class="border-t-[5px] border-camo-mid bg-white p-4 shadow">
					<p class="font-tactical text-camo-mid">Water outages</p>
					<p class="mt-1 text-sm">Freeze-thaw bursts and incidents like Brixham left households without tap water for days or weeks.</p>
				</div>
				<div class="border-t-[5px] border-camo-mid bg-white p-4 shadow">
					<p class="font-tactical text-camo-mid">Just-in-time shelves</p>
					<p class="mt-1 text-sm">UK supermarkets hold only a couple of days’ stock, and panic buying empties them faster.</p>
				</div>
			</div>
			<div class="callout-red">
				<p class="font-tactical text-sas-red">Cost of being unprepared</p>
				<p class="mb-0 mt-1 text-[0.95rem]">
					Scrambling in the dark, paying panic prices, and discovering on day one that your boiler, toilet and phone
					all depend on things that just stopped.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- COMPARISON -->
<section class="bg-camo-mid py-16 text-white">
	<div class="mx-auto max-w-5xl px-4">
		<h2 class="font-stencil text-center text-3xl text-sas-orange sm:text-4xl">UK Gov 3-Day "Be Ready" vs. 14-Day Reality</h2>
		<p class="mx-auto mt-3 max-w-2xl text-center text-[#cfe0d3]">The 5 critical blind spots the 72-hour list leaves open.</p>
		<div class="mt-8 overflow-x-auto">
			<table class="w-full min-w-[640px] border-collapse text-left">
				<thead>
					<tr class="font-tactical text-sm">
						<th class="bg-camo-olive p-3 text-white">Blind spot</th>
						<th class="bg-camo-olive p-3 text-white">Official 3-day guidance</th>
						<th class="bg-sas-orange p-3 text-camo-dark">Beyond 72 Hours upgrade (14 days)</th>
					</tr>
				</thead>
				<tbody>
					{#each compare as r, i}
						<tr class={i % 2 ? 'bg-camo-dark/60' : 'bg-camo-dark/90'}>
							<th scope="row" class="font-tactical p-3 text-sas-orange">{r.topic}</th>
							<td class="p-3 text-sm text-[#b9cdbd]">{r.gov}</td>
							<td class="border-l-4 border-sas-orange p-3 text-sm">{r.hb}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- INSIDE THE HANDBOOK -->
<section class="bg-paper py-16" id="inside">
	<div class="mx-auto max-w-6xl px-4">
		<h2 class="font-stencil text-center text-3xl text-camo-mid sm:text-4xl">Inside the 20-page handbook</h2>
		<p class="mx-auto mt-2 max-w-2xl text-center text-ink/80">
			8 operational modules, 7 Immediate Action Drills and 2 tear-out printable worksheets.
		</p>

		<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each modules as m}
				<article class="border-2 border-camo-mid bg-white">
					<div class="bg-camo-mid px-3 py-2 border-b-4 border-sas-orange">
						<p class="font-tactical text-sm text-sas-orange">Module {m.n}</p>
					</div>
					<div class="p-4">
						<h3 class="font-tactical text-base text-camo-mid leading-snug">{m.t}</h3>
						<p class="mt-2 text-sm text-ink/80">{m.d}</p>
					</div>
				</article>
			{/each}
		</div>

		<h3 class="font-tactical mt-14 text-center text-2xl text-sas-red">The 7 Immediate Action Drills</h3>
		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each drills as d}
				<div class="iad-card">
					<header>Immediate Action Drill {d.n}</header>
					<div class="p-4">
						<p class="font-tactical text-white">{d.t}</p>
						{#if d.preview}
							<div class="relative mt-3 overflow-hidden text-sm">
								<ol class="list-decimal space-y-1 pl-5">
									<li>Stop. Breathe. Check the household. Confirm what has failed.</li>
									<li>Locate your isolation points and make sure everyone knows where they are.</li>
									<li class="blur-[3px] select-none">Secure the next hour: warmth, water and light before anything else.</li>
									<li class="blur-[5px] select-none">Record the time, then follow the step-by-step protocol…</li>
								</ol>
								<div class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-camo-dark"></div>
							</div>
							<p class="font-tactical mt-2 text-xs text-sas-orange">🔒 Full drill inside the handbook</p>
						{/if}
					</div>
				</div>
			{/each}
			<div class="border-2 border-dashed border-camo-mid bg-white p-5">
				<p class="font-tactical text-camo-mid">+ 2 tear-out printable worksheets</p>
				<ul class="mt-2 list-disc pl-5 text-sm">
					<li>Worksheet 01: Printable Household Audit (master checklist)</li>
					<li>Worksheet 02: Cupboard Emergency Reference Sheet</li>
				</ul>
			</div>
		</div>
		<div class="mt-10 text-center">
			<BuyButton class="text-lg" label={`Get the handbook: £${data.priceText}`} />
		</div>
	</div>
</section>

<!-- MID-PAGE LEAD MAGNET -->
<section class="camo-section py-14 text-white" id="free-audit">
	<Camo />
	<div class="camo-content mx-auto max-w-4xl px-4">
		<div class="iad-card">
			<header>Free download // Lead magnet</header>
			<div class="grid gap-6 p-6 md:grid-cols-[1fr_1.1fr] md:items-center">
				<div>
					<h2 class="font-stencil text-2xl leading-tight text-sas-orange sm:text-3xl">Free 72-Hour Home Utility &amp; Stopcock Audit Sheet</h2>
					<p class="mt-3 text-sm text-[#e2ece4]">
						A 1-page UK sheet to locate your stopcock, gas and electric isolators and the five things that fail first.
						Takes 15 minutes. Costs nothing.
					</p>
				</div>
				<LeadForm source="midpage_audit_sheet" />
			</div>
		</div>
	</div>
</section>

<!-- WHO / BUDGET -->
<section class="bg-paper py-16">
	<div class="mx-auto max-w-5xl px-4">
		<div class="module-bar"><span class="l">Module 08 // Step-by-step implementation</span><span class="r">4-week action plan</span></div>
		<div class="mt-8 grid gap-8 md:grid-cols-2">
			<div class="manual">
				<h2 class="!mt-0">Prepared, not panicked</h2>
				<p>
					Built for parents, flat renters, homeowners and older Britons. No survivalist gear, no bunkers, no
					panic: just a calm plan that fits a normal Aldi or Tesco shop.
				</p>
				<ul>
					<li>Works in a small flat with limited storage</li>
					<li>Designed around food your family already eats</li>
					<li>Step-by-step: do one small thing each week</li>
				</ul>
			</div>
			<div class="border-2 border-camo-mid bg-white">
				<div class="bg-camo-mid px-4 py-2 border-b-4 border-sas-orange">
					<p class="font-tactical text-sas-orange">£12–£15 a week budget breakdown</p>
				</div>
				<ul class="divide-y">
					{#each budgetWeeks as b}
						<li class="flex items-center justify-between gap-3 px-4 py-3">
							<span><strong class="font-tactical text-camo-mid">{b.w}</strong> <span class="text-sm">{b.t}</span></span>
							<span class="font-stencil text-lg text-sas-red">{b.c}</span>
						</li>
					{/each}
				</ul>
				<p class="bg-sas-orange-tint px-4 py-2 text-xs text-ink/80">Approximate: based on typical UK supermarket prices.</p>
			</div>
		</div>
	</div>
</section>

<!-- PRICING -->
<section class="camo-section py-16 text-white" id="pricing">
	<Camo />
	<div class="camo-content mx-auto max-w-3xl px-4">
		<div class="border-4 border-sas-orange bg-camo-dark/95 shadow-[0_0_60px_rgba(255,140,26,0.25)]">
			<div class="bg-sas-orange px-4 py-2 text-center">
				<p class="font-tactical text-camo-dark">Instant download · one-time payment</p>
			</div>
			<div class="p-6 text-center sm:p-10">
				<h2 class="font-stencil text-3xl text-sas-orange sm:text-4xl">Get the handbook</h2>
				<p class="mt-5">
					{#if data.showCompare}<span class="text-xl text-[#8aa38f] line-through">£{data.compareText}</span>{/if}
					<span class="font-stencil ml-2 text-6xl text-white">£{data.priceText}</span>
				</p>
				<ul class="mx-auto mt-6 max-w-md space-y-2 text-left">
					{#each includes as i}
						<li class="flex gap-2"><span class="font-bold text-sas-orange">✔</span><span>{i}</span></li>
					{/each}
				</ul>
				<div class="mt-8">
					<BuyButton id="pricing-buy" class="w-full text-lg sm:text-xl" label={`Download now: £${data.priceText}`} />
				</div>
				<p class="font-tactical mt-4 text-xs text-[#9fb5a4]">Secure Stripe checkout · Card, Apple Pay &amp; Google Pay · See <a href="/terms" class="underline">refund policy</a></p>
			</div>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="bg-paper py-16" id="faq">
	<div class="mx-auto max-w-3xl px-4">
		<h2 class="font-stencil text-center text-3xl text-camo-mid sm:text-4xl">Frequently asked questions</h2>
		<div class="mt-8 space-y-3">
			{#each faqs as f, i}
				<div class="border-2 border-camo-mid bg-white">
					<h3>
						<button
							type="button"
							class="font-tactical flex w-full items-center justify-between gap-4 bg-camo-mid px-4 py-3 text-left text-white"
							aria-expanded={openFaq === i}
							aria-controls="faq-{i}"
							id="faq-btn-{i}"
							onclick={() => (openFaq = openFaq === i ? null : i)}
						>
							<span>{f.q}</span>
							<span class="text-sas-orange text-xl">{openFaq === i ? '−' : '+'}</span>
						</button>
					</h3>
					{#if openFaq === i}
						<div id="faq-{i}" role="region" aria-labelledby="faq-btn-{i}" class="border-t-4 border-sas-orange p-4 text-ink">
							{f.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<p class="mt-8 text-center text-sm">
			Want free reading first? <a href="/guides" class="font-semibold text-sas-red underline">Browse the UK preparedness guides</a>.
		</p>
	</div>
</section>

<!-- FINAL CTA -->
<section class="camo-section py-16 text-center text-white">
	<Camo />
	<div class="camo-content mx-auto max-w-3xl px-4">
		<h2 class="font-stencil dist text-4xl text-sas-orange sm:text-5xl">Be ready beyond 72 hours</h2>
		<p class="mx-auto mt-4 max-w-xl text-[#e2ece4]">Prepared, not panicked. Instant PDF. £{data.priceText} one-time.</p>
		<div class="mt-7"><BuyButton class="text-lg" label={`Get the handbook: £${data.priceText}`} /></div>
	</div>
</section>
