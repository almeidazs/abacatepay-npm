import type { WebhookEvent } from '@abacatepay/zod/v2';
import type { WebhookOptions } from './types';

export const dispatch = (
	data: WebhookEvent,
	{ onBillingPaid, onPayload, onPayoutDone, onPayoutFailed }: WebhookOptions,
) => {
	switch (data.event) {
		case 'billing.paid':
			return (onBillingPaid ?? onPayload)?.(data);
		case 'payout.done':
			return (onPayoutDone ?? onPayload)?.(data);
		case 'payout.failed':
			return (onPayoutFailed ?? onPayload)?.(data);
	}
};
