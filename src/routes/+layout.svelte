<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { captureUtm } from '$lib/utm';

	let { data, children } = $props();

	onMount(() => {
		captureUtm();
		const { meta, ga, tiktok } = data.pixels;
		const add = (code: string) => {
			const s = document.createElement('script');
			s.text = code;
			document.head.appendChild(s);
		};
		if (meta && /^\d+$/.test(meta)) {
			add(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`);
		}
		if (ga && /^[A-Za-z0-9-]+$/.test(ga)) {
			const s = document.createElement('script');
			s.async = true;
			s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
			document.head.appendChild(s);
			add(`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}');`);
		}
		if (tiktok && /^[A-Za-z0-9]+$/.test(tiktok)) {
			add(`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._t=ttq._t||{};ttq._t[e]=+new Date;var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=n+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok}');ttq.page()}(window,document,'ttq');`);
		}
	});

	const isHome = $derived(page.url.pathname === '/');
</script>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-sas-orange focus:p-3">Skip to content</a>

{#if !isHome}
	<header class="border-b-4 border-sas-orange bg-camo-mid">
		<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
			<a href="/" class="font-stencil text-xl text-sas-orange">BEYOND 72 HOURS</a>
			<nav class="font-tactical flex gap-5 text-sm text-white" aria-label="Main">
				<a href="/guides" class="hover:text-sas-orange">Guides</a>
				<a href="/#pricing" class="hover:text-sas-orange">Get the handbook</a>
			</nav>
		</div>
	</header>
{/if}

<main id="main">
	{@render children()}
</main>

<footer class="border-t-4 border-sas-orange bg-camo-dark text-[#c5d4c8]">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
		<div>
			<p class="font-stencil text-xl text-sas-orange">BEYOND 72 HOURS</p>
			<p class="mt-2 text-sm">The UK Household Survival &amp; Resilience Handbook. Prepared, not panicked.</p>
		</div>
		<nav aria-label="Footer" class="font-tactical flex flex-col gap-2 text-sm">
			<a href="/guides" class="hover:text-sas-orange">Free UK guides</a>
			<a href="/privacy" class="hover:text-sas-orange">Privacy &amp; cookies</a>
			<a href="/terms" class="hover:text-sas-orange">Terms of sale &amp; refunds</a>
			<a href="/contact" class="hover:text-sas-orange">Contact &amp; order help</a>
		</nav>
		<p class="text-xs leading-relaxed text-[#8aa38f]">
			Independent publication. Not affiliated with, endorsed by, or representing the UK Government, the Cabinet
			Office or any emergency service. General preparedness information only: not professional, medical or
			safety advice. In an emergency call 999.
		</p>
	</div>
	<div class="border-t border-camo-olive py-4 text-center text-xs text-[#6f8a75]">
		© {new Date().getFullYear()} Beyond 72 Hours. All rights reserved.
	</div>
</footer>
