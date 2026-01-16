import { z } from 'zod';
import { createListResponseSchema, createResponseSchema } from '../response';

/**
 * Customer creation schema
 */
export const CreateCustomerSchema = z.object({
	data: z.object({
		email: z.email('Invalid email address'),
		taxId: z.string().optional(),
		name: z.string().optional(),
		cellphone: z.string().optional(),
		zipCode: z.string().optional(),
	}),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;

/**
 * Customer data schema (Response)
 */
export const CustomerSchema = z.object({
	id: z.string(),
	devMode: z.boolean(),
	email: z.email(),
	taxId: z.string().nullable(),
	country: z.string(),
	name: z.string().nullable(),
	cellphone: z.string().nullable(),
	zipCode: z.string().nullable(),
	metadata: z.record(z.string(), z.unknown()).nullable(),
});

export type Customer = z.infer<typeof CustomerSchema>;

export const CustomerResponseSchema = createResponseSchema(CustomerSchema);
export const ListCustomerResponseSchema =
	createListResponseSchema(CustomerSchema);

export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;
export type ListCustomerResponse = z.infer<typeof ListCustomerResponseSchema>;

