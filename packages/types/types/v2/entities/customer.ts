/**
 * https://docs.abacatepay.com/pages/client/reference#estrutura
 */
export interface APICustomer {
	/**
	 * Unique customer identifier.
	 */
	id: string;
	/**
	 * Customer data.
	 */
	metadata: {
		/**
		 * Customer's full name.
		 */
		name: string;
		/**
		 * Customer's email.
		 */
		email: string;
		/**
		 * Customer's CPF or CNPJ.
		 */
		taxId: string;
		/**
		 * Customer's cell phone.
		 */
		cellphone: string;
	};
}
