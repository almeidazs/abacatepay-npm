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
		error: z.null(),
	});

/**
 * Common API response schema
 */
export const ApiResponseSchema = z.object({
	success: z.boolean(),
	data: z.unknown().optional(),
	error: z
		.object({
			code: z.string(),
			message: z.string(),
			details: z.unknown().optional(),
		})
		.optional(),
	metadata: z
		.object({
			timestamp: z.coerce.date(),
			requestId: z.string(),
			version: z.string().default('2.0'),
			pagination: z
				.object({
					page: z.number().int().min(1).optional(),
					limit: z.number().int().min(1).max(100).optional(),
					total: z.number().int().min(0).optional(),
					totalPages: z.number().int().min(0).optional(),
					hasNext: z.boolean().optional(),
					hasPrev: z.boolean().optional(),
				})
				.optional(),
		})
		.optional(),
});

