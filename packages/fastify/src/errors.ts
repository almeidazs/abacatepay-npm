interface AbacatePayFastifyErrorOptions {
	code: string;
}

export class AbacatePayFastifyError extends Error {
	/**
	 * The code of the error.
	 */
	readonly code: string;
	/**
	 * URL for the docs of [@abacatepay/fastify](https://www.npmjs.com/package/@abacatepay/fastify)
	 */
	static readonly docs = 'https://docs.abacatepay.com/pages/ecosystem/fastify';

	constructor(message: string, options: AbacatePayFastifyErrorOptions) {
		super(message);

		this.code = options.code;
		this.name = 'AbacatePayFastifyError';
	}
}
