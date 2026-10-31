/// <reference types="@cloudflare/workers-types" />

declare global {
	namespace App {
		interface Platform {
			env?: {
				STRIPE_SECRET_KEY?: string;
				STRIPE_WEBHOOK_SECRET?: string;
				STRIPE_PRICE_ID?: string;
				DOWNLOAD_HMAC_SECRET?: string;
				EMAIL_PROVIDER?: string;
				EMAIL_API_KEY?: string;
				EMAIL_LIST_ID_LEADS?: string;
				EMAIL_LIST_ID_BUYERS?: string;
				EMAIL_FROM_ADDRESS?: string;
				PUBLIC_SITE_URL?: string;
				PUBLIC_PRODUCT_PRICE_GBP?: string;
				PUBLIC_COMPARE_AT_PRICE_GBP?: string;
				PUBLIC_SUPPORT_EMAIL?: string;
				DOWNLOADS?: R2Bucket;
				LEADS_KV?: KVNamespace;
			};
			context?: ExecutionContext;
			caches?: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
