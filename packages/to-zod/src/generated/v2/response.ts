import { z } from 'zod';

/**
 * Creates a standard API response schema
 * @param dataSchema The Zod schema for the 'data' field
 */
export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		data: dataSchema,
		error: z.null(),
	});

/**
 * Creates a standard API list response schema with pagination
 * @param itemSchema The Zod schema for the items in the list
 */
export const createListResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		data: z.array(itemSchema),
		pagination: z.object({
			page: z.number(),
			limit: z.number(),
			total: z.number(),
			totalPages: z.number(),
		}),
		error: z.null(),
	});
