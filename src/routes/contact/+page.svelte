<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();
</script>

<Seo title="Contact & Order Help | Beyond 72 Hours" description="Contact Beyond 72 Hours customer support, find a lost download link, or request a refund." path="/contact" site={data.site} />

<section class="bg-paper py-12">
	<div class="mx-auto max-w-3xl px-4">
		<div class="module-bar"><span class="l">Support</span><span class="r">Order help</span></div>
		<h1 class="font-stencil mt-6 text-3xl text-camo-mid sm:text-4xl">Contact &amp; Order Help</h1>
		<div class="manual mt-4">
			<p>We aim to reply within one working day.</p>
			<div class="callout-amber">
				<p class="mb-0"><strong>Email:</strong> <a href="mailto:{data.support}">{data.support}</a></p>
			</div>
			<h2>Lost your download?</h2>
			<ol>
				<li>Check your inbox (and spam or promotions) for an email with the subject "Your download".</li>
				<li>Return to the confirmation page from Stripe, if you still have the tab open.</li>
				<li>Otherwise email us from the address you used at checkout with your name and approximate purchase date, and we'll resend your links.</li>
			</ol>
			<h2>Refunds</h2>
			<p>See our <a href="/terms">Terms of Sale &amp; refund policy</a>. To request a refund, email us with your order email.</p>
			<h2>Privacy requests</h2>
			<p>To access or delete your data, see our <a href="/privacy">Privacy Policy</a> and email the address above.</p>
		</div>
	</div>
</section>
