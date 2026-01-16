import { z } from 'zod';

export const CheckoutItemSchema = z.object({
	id: z.string().min(1, 'Product ID is required'),
	quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export type CheckoutItem = z.infer<typeof CheckoutItemSchema>;

export const CheckoutCustomerSchema = z.object({
	name: z.string().min(1, 'Customer name is required'),
	cellphone: z.string().min(1, 'Cellphone is required'),
	email: z.email('Invalid email address'),
	taxId: z.string().min(1, 'Tax ID is required'),
});

export type CheckoutCustomer = z.infer<typeof CheckoutCustomerSchema>;

export const CreateCheckoutSchema = z.object({
	items: z.array(CheckoutItemSchema).min(1, 'At least one item is required'),
	method: z.enum(['PIX', 'CARD']).optional(),
	returnUrl: z.url().optional(),
	completionUrl: z.url().optional(),
	customerId: z.string().optional(),
	customer: CheckoutCustomerSchema.optional(),
	coupons: z.array(z.string()).optional(),
});

export type CreateCheckout = z.infer<typeof CreateCheckoutSchema>;

/*
 *{
	"data": [
		{
			"id": "bill_abc123xyz",
			"externalId": "pedido-123",
			"url": "https://app.abacatepay.com/pay/bill_abc123xyz",
			"amount": 10000,
			"paidAmount": null,
			"items": [
				{
					"id": "prod_456",
					"quantity": 2
				}
			],
			"status": "PENDING",
			"coupons": [],
			"devMode": false,
			"customerId": null,
			"returnUrl": null,
			"completionUrl": null,
			"receiptUrl": null,
			"metadata": {},
			"createdAt": "2024-11-04T18:38:28.573Z",
			"updatedAt": "2024-11-04T18:38:28.573Z"
		}
	],
	"error": "<unknown>"
}
 * */
const StatusEnum = z.enum([
	'PENDING',
	'EXPIRED',
	'CANCELLED',
	'PAID',
	'REFUNDED',
]);

export const CheckoutSchema = z.object({
	id: z.string(),
	externalId: z.string().nullable(),
	url: z.url(),
	amount: z.number(),
	paidAmount: z.number().nullable(),
	coupons: z.array(z.string()).nullable(),
	items: CheckoutItemSchema,
	status: StatusEnum,
	devMode: z.boolean(),
	customerId: z.string().nullable(),
	returnUrl: z.url().nullable(),
	completionUrl: z.url().nullable(),
	receiptUrl: z.url().nullable(),
	metadata: z.object(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	error: z.null(),
});

export type Checkout = z.infer<typeof CheckoutSchema>;
