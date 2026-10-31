<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/Seo.svelte';

	let { data: pd, } = $props();
	// layout data is merged into page data by SvelteKit
	const data = $derived(pd);

	onMount(() => {
		if (data.status !== 'paid' || data.demo) return;
		const key = `b72_purchase_${data.sessionId}`;
		if (sessionStorage.getItem(key)) return;
		sessionStorage.setItem(key, '1');
		const w = window as unknown as {
			fbq?: (...a: unknown[]) => void;
			gtag?: (...a: unknown[]) => void;
			ttq?: { track: (n: string, p?: object) => void };
		};
		const value = data.amount || data.price;
		w.fbq?.('track', 'Purchase', { value, currency: 'GBP' });
		w.gtag?.('event', 'purchase', { transaction_id: data.sessionId, value, currency: 'GBP' });
		w.ttq?.track('CompletePayment', { value, currency: 'GBP' });
	});
</script>

<Seo title="Your download | Beyond 72 Hours" description="Download your Beyond 72 Hours handbook." path="/success" site={data.site} noindex />

<section class="camo-section min-h-[70vh] py-14 text-white">
	<div class="camo-content mx-auto max-w-2xl px-4">
		{#if data.status === 'paid'}
			<div class="border-4 border-sas-orange bg-camo-dark/95 p-6 text-center sm:p-10">
				<p class="font-tactical text-sas-orange">Payment confirmed</p>
				<h1 class="font-stencil mt-2 text-3xl text-white sm:text-4xl">You're prepared, not panicked.</h1>
				{#if data.demo}
					<p class="mt-4 border-2 border-dashed border-sas-orange p-3 text-sm text-sas-orange">
						DEMO MODE: no Stripe key is configured, so no payment was taken. Set <code>STRIPE_SECRET_KEY</code> to enable live checkout.
					</p>
				{/if}
				<div class="mt-8 flex flex-col gap-4">
					<a id="download-pdf" href={data.pdf} class="btn-orange pulse text-lg" data-sveltekit-reload>Download your handbook (PDF)</a>
				</div>
				<p class="mt-6 text-sm text-[#cfe0d3]">
					{#if data.email}A backup download link has been emailed to <strong>{data.email}</strong>.{:else}A backup download link will be emailed to the address you used at checkout.{/if}
					Can't find it? Check spam or <a href="/contact" class="underline">contact us</a>.
				</p>
				<div class="mt-8 border-t border-camo-olive pt-6 text-left text-sm text-[#cfe0d3]">
					<p class="font-tactical text-sas-orange">Start here</p>
					<p class="mt-1">Open Drill 01, <em>The 15-Minute Pre-Crisis Home Audit</em>, and find your stopcock tonight.</p>
				</div>
			</div>
		{:else if data.status === 'unpaid'}
			<div class="border-4 border-sas-red bg-camo-dark/95 p-8 text-center">
				<h1 class="font-stencil text-3xl text-sas-orange">We couldn't confirm payment</h1>
				<p class="mt-4">If you've just paid, wait a few seconds and refresh this page. Otherwise, you can try again.</p>
				<div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
					<a href="/#pricing" class="btn-orange">Back to checkout</a>
					<a href="/contact" class="btn-ghost">Contact support</a>
				</div>
			</div>
		{:else}
			<div class="border-4 border-sas-orange bg-camo-dark/95 p-8 text-center">
				<h1 class="font-stencil text-3xl text-sas-orange">No order found</h1>
				<p class="mt-4">This page is shown after checkout. Missing your download? Use our order help page.</p>
				<div class="mt-6"><a href="/contact" class="btn-orange">Order help</a></div>
			</div>
		{/if}
	</div>
</section>
