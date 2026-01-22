import { WebhookEvent } from '@abacatepay/zod/v2';
import type { Request, Response } from 'express';
import { AbacatePayExpressError } from './errors';
import type { WebhookOptions } from './types';
import { verifyWebhookSignature } from './utils';

const BAD_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;
const NO_CONTENT_STATUS_CODE = 204;

export { AbacatePayExpressError } from './errors';
export * from './types';
export { version } from './version';

export const Webhooks = ({
	onPayload,
	onPayoutDone,
	onBillingPaid,
	onPayoutFailed,
	secret = process.env.ABACATEPAY_WEBHOOK_SECRET ??
		process.env.ABACATE_PAY_WEBHOOK_SECRET,
}: WebhookOptions) => {
	if (!secret)
		throw new AbacatePayExpressError(
			'Webhook secret is missing. Set ABACATEPAY_WEBHOOK_SECRET.',
			{ code: 'WEBHOOK_SECRET_MISSING' },
		);

	return async (req: Request, res: Response) => {
		const { webhookSecret } = req.query;

		if (webhookSecret !== secret)
			return res
				.status(UNAUTHORIZED_STATUS_CODE)
				.json({ error: 'Unauthorized' });

		const signature = req.headers['x-webhook-signature'];

		if (typeof signature !== 'string')
			return res
				.status(BAD_REQUEST_STATUS_CODE)
				.json({ error: 'Missing signature' });

		const { body } = req;

		if (!Buffer.isBuffer(body))
			return res
				.status(BAD_REQUEST_STATUS_CODE)
				.json({ error: 'Invalid raw body' });

		const raw = body.toString('utf8');

		if (!verifyWebhookSignature(raw, signature))
			return res
				.status(UNAUTHORIZED_STATUS_CODE)
				.json({ error: 'Invalid signature' });

		let parsed: unknown;

		try {
			parsed = JSON.parse(raw);
		} catch {
			return res
				.status(BAD_REQUEST_STATUS_CODE)
				.json({ error: 'Invalid JSON' });
		}

		const { data, success } = WebhookEvent.safeParse(parsed);

		if (!success)
			return res
				.status(BAD_REQUEST_STATUS_CODE)
				.json({ error: 'Invalid payload' });

		switch (data.event) {
			case 'billing.paid':
				await (onBillingPaid ?? onPayload)?.(data);

				break;
			case 'payout.done':
				await (onPayoutDone ?? onPayload)?.(data);

				break;
			case 'payout.failed':
				await (onPayoutFailed ?? onPayload)?.(data);

				break;
		}

		return res.status(NO_CONTENT_STATUS_CODE).send();
	};
};
