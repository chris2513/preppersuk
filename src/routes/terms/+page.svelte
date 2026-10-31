<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();
</script>

<Seo title="Terms of Sale, Refunds & Disclaimer | Beyond 72 Hours" description="Terms of sale, digital product refund policy and preparedness disclaimer for Beyond 72 Hours." path="/terms" site={data.site} />

<section class="bg-paper py-12">
	<div class="mx-auto max-w-3xl px-4">
		<div class="module-bar"><span class="l">Legal</span><span class="r">Terms of sale</span></div>
		<h1 class="font-stencil mt-6 text-3xl text-camo-mid sm:text-4xl">Terms of Sale, Refunds &amp; Disclaimer</h1>
		<div class="manual mt-4">
			<p><em>Last updated: 31 October 2026.</em></p>
			<h2>The product</h2>
			<p>You are buying a digital download (PDF): "Beyond 72 Hours: The UK Household Survival &amp; Resilience Handbook" (PDF). No physical item is shipped. Price is shown in GBP at checkout and includes any VAT where applicable.</p>
			<h2>Delivery</h2>
			<p>Download links are provided immediately after payment on the confirmation page and by email. If you do not receive access, contact <a href="mailto:{data.support}">{data.support}</a> with the email used at checkout.</p>
			<h2>Right to cancel &amp; refund policy</h2>
			<p>Under the Consumer Contracts Regulations 2013, you agree that we begin supplying the digital content immediately and acknowledge that you therefore lose your statutory 14-day right to cancel once the download begins. We nonetheless offer a <strong>30-day satisfaction refund</strong>: if the handbook is not useful to you, email us within 30 days of purchase and we will refund you in full. Your statutory rights for faulty digital content are not affected.</p>
			<h2>Licence &amp; copyright</h2>
			<p>The handbook is licensed for personal and household use. You may print it for your household. You may not resell, redistribute or publicly share the files.</p>
			<h2>Preparedness disclaimer</h2>
			<div class="callout-red">
				<p class="mb-0">The handbook and this website provide general information on household resilience. They are not professional, medical, legal, gas, electrical or plumbing advice, and are not endorsed by the UK Government or any emergency service. Always follow official guidance and use qualified professionals for gas, electrical and water work. Never use fuel-burning devices indoors without proper ventilation and a working carbon monoxide alarm. In an emergency call 999.</p>
			</div>
			<h2>Liability</h2>
			<p>Nothing limits liability that cannot be limited by law. Otherwise our liability is limited to the price you paid.</p>
			<h2>Governing law</h2>
			<p>These terms are governed by the laws of England and Wales.</p>
		</div>
	</div>
</section>
