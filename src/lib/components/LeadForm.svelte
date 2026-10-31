<script lang="ts">
	import { getUtm } from '$lib/utm';

	let {
		source,
		heading = '',
		button = 'Send Me The Free Sheet',
		compact = false,
		showName = true
	}: { source: string; heading?: string; button?: string; compact?: boolean; showName?: boolean } = $props();

	const uid = $props.id();
	let email = $state('');
	let firstName = $state('');
	let website = $state(''); // honeypot
	let status = $state<'idle' | 'loading' | 'done' | 'error'>('idle');
	let message = $state('');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'loading') return;
		if (!EMAIL_RE.test(email.trim())) {
			status = 'error';
			message = 'Please enter a valid email address.';
			return;
		}
		status = 'loading';
		message = '';
		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email.trim(), firstName: firstName.trim(), source, website, utm: getUtm() })
			});
			const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
			if (res.ok && data.success) {
				status = 'done';
				const w = window as unknown as { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void; ttq?: { track: (n: string) => void } };
				w.fbq?.('track', 'Lead');
				w.gtag?.('event', 'generate_lead', { method: source });
				w.ttq?.track('SubmitForm');
			} else {
				status = 'error';
				message = data.error || 'Something went wrong. Please try again.';
			}
		} catch {
			status = 'error';
			message = 'Network error. Please try again.';
		}
	}
</script>

{#if status === 'done'}
	<div class="border-l-8 border-sas-orange bg-camo-dark p-5 text-white" role="status">
		<p class="font-tactical text-lg text-sas-orange">Check your inbox</p>
		<p class="mt-1 text-sm text-[#e2ece4]">
			You're in. Download your free 72-Hour Utility &amp; Stopcock Audit Sheet now, then print it and tick it off tonight.
			We'll also email you a copy: check promotions or spam if it doesn't arrive.
		</p>
		<a
			href="/free/Free_72_Hour_Utility_Stopcock_Audit_Sheet.pdf"
			download
			class="btn-orange mt-4 text-sm"
			data-sveltekit-reload>Download the free audit sheet (PDF)</a
		>
	</div>
{:else}
	<form onsubmit={submit} novalidate class="w-full">
		{#if heading}<p class="font-tactical mb-3 text-sas-orange">{heading}</p>{/if}
		<div class="flex flex-col gap-3 {compact ? 'sm:flex-row' : ''}">
			{#if showName}
				<div class="flex-1">
					<label for="{uid}-name" class="sr-only">First name</label>
					<input
						id="{uid}-name"
						type="text"
						autocomplete="given-name"
						placeholder="First name"
						bind:value={firstName}
						class="w-full border-2 border-camo-leaf bg-white px-4 py-3 text-ink placeholder:text-gray-500 focus:border-sas-orange"
					/>
				</div>
			{/if}
			<div class="flex-[1.4]">
				<label for="{uid}-email" class="sr-only">Email address</label>
				<input
					id="{uid}-email"
					type="email"
					required
					autocomplete="email"
					placeholder="Your email address"
					bind:value={email}
					aria-invalid={status === 'error'}
					class="w-full border-2 border-camo-leaf bg-white px-4 py-3 text-ink placeholder:text-gray-500 focus:border-sas-orange"
				/>
			</div>
			<!-- Honeypot: hidden from humans -->
			<div aria-hidden="true" style="position:absolute;left:-9999px;height:0;overflow:hidden">
				<label for="{uid}-web">Website</label>
				<input id="{uid}-web" type="text" tabindex="-1" autocomplete="off" bind:value={website} />
			</div>
			<button type="submit" class="btn-orange" disabled={status === 'loading'}>
				{status === 'loading' ? 'Sending…' : button}
			</button>
		</div>
		{#if status === 'error'}<p role="alert" class="mt-2 text-sm font-semibold text-red-300">{message}</p>{/if}
		<p class="mt-2 text-xs text-[#9fb5a4]">
			No spam. Unsubscribe any time. See our <a href="/privacy" class="underline">Privacy Policy</a>.
		</p>
	</form>
{/if}
