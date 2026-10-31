export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid', 'gclid'] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = 'b72_utm';

/** Capture attribution params from the URL (first touch wins per key until overwritten by a new campaign). */
export function captureUtm(): Utm {
	if (typeof window === 'undefined') return {};
	let stored: Utm = {};
	try {
		stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
	} catch {
		/* ignore */
	}
	const params = new URLSearchParams(window.location.search);
	let changed = false;
	const fresh: Utm = {};
	for (const k of UTM_KEYS) {
		const v = params.get(k);
		if (v) {
			fresh[k] = v.slice(0, 200);
			changed = true;
		}
	}
	if (changed) {
		stored = fresh; // a new campaign click replaces the old attribution
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
		} catch {
			/* ignore */
		}
	}
	return stored;
}

export function getUtm(): Utm {
	return captureUtm();
}

/** Server-side: keep only known keys with sane lengths. */
export function sanitizeUtm(input: unknown): Utm {
	const out: Utm = {};
	if (input && typeof input === 'object') {
		for (const k of UTM_KEYS) {
			const v = (input as Record<string, unknown>)[k];
			if (typeof v === 'string' && v) out[k] = v.slice(0, 200);
		}
	}
	return out;
}
