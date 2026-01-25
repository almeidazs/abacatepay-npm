import { WebhookEvent } from '@abacatepay/zod/v2';

export const parse = (
	value: unknown,
): ReturnType<typeof WebhookEvent.safeParse> => WebhookEvent.safeParse(value);

export { dispatch } from './dispatch';
export { ABACATEPAY_SHARED_KEY, verify } from './signature';

export * from './types';
