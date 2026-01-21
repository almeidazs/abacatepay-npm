import { WebhookEvent } from '@abacatepay/zod/v2';
import type { Context } from 'hono';
import type { WebhookOptions } from './types';
import { verifyWebhookSignature } from './utils';

export { version } from './version';

/**
 * A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.
 * @param options Options to use
 */
export const Webhooks = ({
	onPayload,
	onPayoutDone,
	onBillingPaid,
	onPayoutFailed,
	secret = process.env.ABACATEPAY_WEBHOOK_SECRET ??
		process.env.ABACATE_PAY_WEBHOOK_SECRET,
}: WebhookOptions) => {
	return async (ctx: Context) => {
		if (ctx.req.query('webhookSecret') !== secret) return;

		const signature = ctx.res.headers.get('x-webhook-signature');

		if (!signature) return;

		const raw = await ctx.req.text();

		if (!verifyWebhookSignature(raw, signature)) return;

		const data = WebhookEvent.parse(JSON.parse(raw));

		switch (data.event) {
			case 'billing.paid':
				return (onBillingPaid ?? onPayload)?.(data);
			case 'payout.done':
				return (onPayoutDone ?? onPayload)?.(data);
			case 'payout.failed':
				return (onPayoutFailed ?? onPayload)?.(data);
		}
	};
};
