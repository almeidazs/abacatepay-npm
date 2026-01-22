interface AbacatePayExpressErrorOptions {
	code: string;
}

export class AbacatePayExpressError extends Error {
	/**
	 * The code of the error.
	 */
	readonly code: string;
	/**
	 * URL for the docs of [@abacatepay/express](https://www.npmjs.com/package/@abacatepay/express)
	 */
	static readonly docs = 'https://docs.abacatepay.com/pages/ecosystem/express';

	constructor(message: string, options: AbacatePayExpressErrorOptions) {
		super(message);

		this.code = options.code;
		this.name = 'AbacatePayExpressError';
	}
}
