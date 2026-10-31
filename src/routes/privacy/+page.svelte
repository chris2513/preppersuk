<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();
</script>

<Seo title="Privacy Policy & Cookie Notice | Beyond 72 Hours" description="How Beyond 72 Hours collects and uses personal data under UK GDPR, including email sign-ups, payments and cookies." path="/privacy" site={data.site} />

<section class="bg-paper py-12">
	<div class="mx-auto max-w-3xl px-4">
		<div class="module-bar"><span class="l">Legal</span><span class="r">UK GDPR</span></div>
		<h1 class="font-stencil mt-6 text-3xl text-camo-mid sm:text-4xl">Privacy Policy &amp; Cookie Notice</h1>
		<div class="manual mt-4">
			<p><em>Last updated: 31 October 2026.</em></p>
			<h2>Who we are</h2>
			<p>Beyond 72 Hours ("we", "us") sells the digital handbook "Beyond 72 Hours: The UK Household Survival &amp; Resilience Handbook" and publishes free preparedness guides. We are the data controller for personal data collected through this website. Contact: <a href="mailto:{data.support}">{data.support}</a>.</p>
			<h2>What we collect</h2>
			<ul>
				<li><strong>Email sign-ups:</strong> your name (optional) and email address, plus the page you signed up from and advertising attribution parameters (utm_*, fbclid, gclid).</li>
				<li><strong>Purchases:</strong> payments are processed by Stripe. We receive your name, email, and payment status, but never your full card number.</li>
				<li><strong>Technical data:</strong> IP address and device information in server logs for security and fraud prevention.</li>
			</ul>
			<h2>Why we use it (lawful bases)</h2>
			<ul>
				<li>To deliver your purchase and download links (contract).</li>
				<li>To send the free resources and emails you request, and occasional related offers (consent / legitimate interests). Unsubscribe any time via the link in every email.</li>
				<li>To measure advertising effectiveness and improve the site (consent, where analytics or advertising cookies are enabled).</li>
				<li>To keep records and prevent fraud (legal obligation / legitimate interests).</li>
			</ul>
			<h2>Who we share it with</h2>
			<p>Service providers acting on our behalf: Stripe (payments), our email service provider, Cloudflare (hosting and security), and, if enabled, advertising platforms (Meta, Google, TikTok). Some providers process data outside the UK under appropriate safeguards such as the UK International Data Transfer Addendum.</p>
			<h2>Cookies &amp; similar technologies</h2>
			<p>We store a small amount of data in your browser (local storage) to remember which advertisement brought you here. If advertising pixels are enabled, those providers may set cookies. You can block or delete cookies in your browser settings.</p>
			<h2>Retention</h2>
			<p>Email subscriber data is kept until you unsubscribe. Order records are kept for 6 years for accounting purposes.</p>
			<h2>Your rights</h2>
			<p>Under UK GDPR you can request access, correction, deletion, restriction or portability of your data, and object to processing. Email <a href="mailto:{data.support}">{data.support}</a>. You may also complain to the Information Commissioner's Office at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.</p>
		</div>
	</div>
</section>
