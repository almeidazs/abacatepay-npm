import { type WebhookEvent, WebhookEventType } from './webhook';

/**
 * A type guard check for `withdraw.done` webhook events
 * @param event - The webhook event to check against
 * @returns A boolean that indicates if the webhook is a withdraw done webhook
 */
export function isWithdrawDoneWebhookEvent(event: WebhookEvent) {
	return event.event === WebhookEventType.WithdrawDone;
}

/**
 * A type guard check for `withdraw.failed` webhook events
 * @param event - The webhook event to check against
 * @returns A boolean that indicates if the webhook is a withdraw failed webhook
 */
export function isWithdrawFailedWebhookEvent(event: WebhookEvent) {
	return event.event === WebhookEventType.WithdrawFailed;
}

/**
 * A type guard check for `billing.paid` webhook events
 * @param event - The webhook event to check against
 * @returns A boolean that indicates if the webhook is a billing paid webhook
 */
export function isBillingPaidWebhookEvent(event: WebhookEvent) {
	return event.event === WebhookEventType.BillingPaid;
}
