import { type Static, Type as t } from '@sinclair/typebox';

/**
 * https://docs.abacatepay.com/pages/client/reference#estrutura
 */
export const APICustomer = t.Object({
	id: t.String({
		description: 'Unique customer identifier.',
	}),
	metadata: t.Object({
		name: t.String({
			description: "Customer's full name.",
		}),
		email: t.String({
			format: 'email',
			description: "Customer's email",
		}),
		taxId: t.String({
			description: "Customer's CPF or CNPJ.",
		}),
		cellphone: t.String({
			description: "Customer's cell phone.",
		}),
	}),
});

/**
 * https://docs.abacatepay.com/pages/client/reference#estrutura
 */
export type APICustomer = Static<typeof APICustomer>;
