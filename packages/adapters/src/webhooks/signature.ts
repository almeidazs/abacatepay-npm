import { createHmac, timingSafeEqual } from 'node:crypto';

export const ABACATEPAY_SHARED_KEY =
	't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9';

export const verify = (raw: string, signature: string) => {
	const bodyBuffer = Buffer.from(raw, 'utf8');

	const expectedSig = createHmac('sha256', ABACATEPAY_SHARED_KEY)
		.update(bodyBuffer)
		.digest('base64');

	const A = Buffer.from(expectedSig);
	const B = Buffer.from(signature);

	return A.length === B.length && timingSafeEqual(A, B);
};
