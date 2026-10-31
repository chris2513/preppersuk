import type { Env } from './env';

export type Contact = {
	email: string;
	firstName?: string;
	/** Tag applied to the contact (provider-specific handling below). */
	tag: string;
	/** Which list/audience: leads or buyers. */
	list: 'leads' | 'buyers';
	/** Extra attribution / custom fields (utm_*, source, download_link ...). */
	fields?: Record<string, string>;
};

export type EmailResult = { ok: boolean; provider: string; mock?: boolean; error?: string };

export const TAGS = {
	lead: 'lead_72hr_audit',
	buyer: 'customer_beyond_72_hours'
} as const;

async function call(url: string, init: RequestInit): Promise<Response> {
	const res = await fetch(url, init);
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		throw new Error(`${new URL(url).host} ${res.status}: ${body.slice(0, 300)}`);
	}
	return res;
}

const json = (headers: Record<string, string>) => ({ 'Content-Type': 'application/json', Accept: 'application/json', ...headers });

function listId(env: Env, list: Contact['list']): string | undefined {
	return (list === 'buyers' ? env.EMAIL_LIST_ID_BUYERS : env.EMAIL_LIST_ID_LEADS) || undefined;
}

/**
 * Subscribe / update a contact in the configured autoresponder.
 * Works over fetch only (Cloudflare Workers safe). With no EMAIL_API_KEY it runs in
 * mock mode and logs to the console so local testing works out of the box.
 */
export async function subscribeOrUpdateContact(env: Env, c: Contact): Promise<EmailResult> {
	const provider = (env.EMAIL_PROVIDER || 'mailerlite').toLowerCase();
	const key = env.EMAIL_API_KEY;
	const fields = c.fields ?? {};

	// Optional backup log so leads are never lost.
	if (env.LEADS_KV) {
		try {
			await env.LEADS_KV.put(
				`${c.list}:${Date.now()}:${c.email}`,
				JSON.stringify({ ...c, at: new Date().toISOString() }),
				{ expirationTtl: 60 * 60 * 24 * 365 }
			);
		} catch {
			/* non-fatal */
		}
	}

	if (!key) {
		console.log('[email:mock] subscribeOrUpdateContact', JSON.stringify(c));
		return { ok: true, provider: 'mock', mock: true };
	}

	try {
		const gid = listId(env, c.list);
		switch (provider) {
			case 'mailerlite':
				await call('https://connect.mailerlite.com/api/subscribers', {
					method: 'POST',
					headers: json({ Authorization: `Bearer ${key}` }),
					body: JSON.stringify({
						email: c.email,
						// custom fields must be created in MailerLite first (utm_source, etc.)
						fields: { ...(c.firstName ? { name: c.firstName } : {}), ...fields },
						groups: gid ? [gid] : undefined
					})
				});
				break;
			case 'convertkit':
			case 'kit': {
				await call('https://api.kit.com/v4/subscribers', {
					method: 'POST',
					headers: json({ 'X-Kit-Api-Key': key }),
					body: JSON.stringify({
						email_address: c.email,
						first_name: c.firstName,
						state: 'active',
						fields
					})
				});
				// EMAIL_LIST_ID_* = Kit tag IDs for leads / buyers
				if (gid) {
					await call(`https://api.kit.com/v4/tags/${gid}/subscribers`, {
						method: 'POST',
						headers: json({ 'X-Kit-Api-Key': key }),
						body: JSON.stringify({ email_address: c.email })
					});
				}
				break;
			}
			case 'resend':
				if (!gid) throw new Error('EMAIL_LIST_ID_* must be a Resend audience id');
				await call(`https://api.resend.com/audiences/${gid}/contacts`, {
					method: 'POST',
					headers: json({ Authorization: `Bearer ${key}` }),
					body: JSON.stringify({ email: c.email, first_name: c.firstName, unsubscribed: false })
				});
				break;
			case 'loops':
				await call('https://app.loops.so/api/v1/contacts/update', {
					method: 'POST',
					headers: json({ Authorization: `Bearer ${key}` }),
					body: JSON.stringify({
						email: c.email,
						firstName: c.firstName,
						userGroup: c.tag,
						source: fields.source,
						...fields,
						mailingLists: gid ? { [gid]: true } : undefined
					})
				});
				break;
			case 'brevo':
				await call('https://api.brevo.com/v3/contacts', {
					method: 'POST',
					headers: json({ 'api-key': key }),
					body: JSON.stringify({
						email: c.email,
						updateEnabled: true,
						attributes: {
							FIRSTNAME: c.firstName ?? '',
							...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k.toUpperCase(), v]))
						},
						listIds: gid && /^\d+$/.test(gid) ? [Number(gid)] : undefined
					})
				});
				break;
			default:
				throw new Error(`Unknown EMAIL_PROVIDER "${provider}"`);
		}
		return { ok: true, provider };
	} catch (e) {
		console.error('[email] failed', e);
		return { ok: false, provider, error: e instanceof Error ? e.message : String(e) };
	}
}

/**
 * Send the buyer their backup download link. Direct transactional send is implemented for
 * Resend and Brevo; for other providers the link is stored in the `download_link` field so
 * a tag/group-triggered automation can email it.
 */
export async function sendDownloadEmail(
	env: Env,
	to: { email: string; name?: string },
	downloadUrl: string,
	supportEmail?: string
): Promise<EmailResult> {
	const provider = (env.EMAIL_PROVIDER || '').toLowerCase();
	const key = env.EMAIL_API_KEY;
	const from = env.EMAIL_FROM_ADDRESS;
	const subject = 'Your download: Beyond 72 Hours – UK Household Survival Handbook';
	const html = `<div style="font-family:Arial,sans-serif;max-width:560px">
<h2 style="color:#0E2B16">Thanks${to.name ? ', ' + escapeHtml(to.name) : ''} — you're prepared, not panicked.</h2>
<p>Your handbook is ready. This secure link works for 7 days:</p>
<p><a href="${downloadUrl}" style="background:#FF8C1A;color:#07190C;padding:14px 22px;font-weight:bold;text-decoration:none;display:inline-block">DOWNLOAD THE HANDBOOK (PDF)</a></p>
<p style="font-size:13px;color:#555">Problems? Reply to this email${supportEmail ? ' or write to ' + escapeHtml(supportEmail) : ''}.</p></div>`;

	if (!key || !from) {
		console.log('[email:mock] sendDownloadEmail →', to.email, downloadUrl);
		return { ok: true, provider: 'mock', mock: true };
	}
	try {
		if (provider === 'resend') {
			await call('https://api.resend.com/emails', {
				method: 'POST',
				headers: json({ Authorization: `Bearer ${key}` }),
				body: JSON.stringify({ from, to: [to.email], subject, html })
			});
			return { ok: true, provider };
		}
		if (provider === 'brevo') {
			await call('https://api.brevo.com/v3/smtp/email', {
				method: 'POST',
				headers: json({ 'api-key': key }),
				body: JSON.stringify({
					sender: { email: from },
					to: [{ email: to.email, name: to.name }],
					subject,
					htmlContent: html
				})
			});
			return { ok: true, provider };
		}
		return { ok: true, provider, mock: true };
	} catch (e) {
		console.error('[email] download mail failed', e);
		return { ok: false, provider, error: e instanceof Error ? e.message : String(e) };
	}
}

function escapeHtml(s: string): string {
	return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
