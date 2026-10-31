<script lang="ts">
	let {
		title,
		description,
		path = '/',
		type = 'website',
		image = '/cover.png',
		site,
		jsonLd = [],
		noindex = false
	}: {
		title: string;
		description: string;
		path?: string;
		type?: 'website' | 'article' | 'product';
		image?: string;
		site: string;
		jsonLd?: object[];
		noindex?: boolean;
	} = $props();

	const canonical = $derived(site + path);
	const img = $derived(image.startsWith('http') ? image : site + image);
	const ld = $derived(jsonLd.map((o) => JSON.stringify(o).replace(/</g, '\\u003c')));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex, nofollow" />{/if}
	<meta property="og:locale" content="en_GB" />
	<meta property="og:site_name" content="Beyond 72 Hours" />
	<meta property="og:type" content={type === 'product' ? 'website' : type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={img} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
	{#each ld as s}
		{@html `<script type="application/ld+json">${s}</script>`}
	{/each}
</svelte:head>
