<script lang="ts">
	import { getUtm } from '$lib/utm';

	let {
		label = 'Get The Handbook',
		class: cls = '',
		email = '',
		id = undefined
	}: { label?: string; class?: string; email?: string; id?: string } = $props();

	let loading = $state(false);
	let err = $state('');

	async function buy() {
		if (loading) return;
		loading = true;
		err = '';
		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email || undefined, utm: getUtm() })
			});
			const data = (await res.json()) as { url?: string; demo?: boolean; note?: string; error?: string };
			if (data.url) {
				if (data.demo) console.info(data.note);
				window.location.href = data.url;
				return;
			}
			err = data.error || 'Something went wrong. Please try again.';
		} catch {
			err = 'Network error. Please try again.';
		}
		loading = false;
	}
</script>

<span class="inline-flex flex-col items-stretch">
	<button {id} type="button" class="btn-orange {cls}" onclick={buy} disabled={loading}>
		{#if loading}Opening secure checkout…{:else}{label}{/if}
	</button>
	{#if err}<span role="alert" class="mt-2 text-sm font-semibold text-sas-red">{err}</span>{/if}
</span>
