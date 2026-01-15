/**
 * https://docs.abacatepay.com/pages/withdraw/reference#estrutura
 */
export interface APIWithdraw {
	/**
	 * Unique ID of the AbacatePay withdrawal transaction.
	 */
	id: string;
	/**
	 * Current status of the withdrawal transaction.
	 */
	status: WithdrawStatus;
	/**
	 * Indicates whether the loot was created in a development environment (sandbox) or production. AbacatePay currently only supports withdrawals in production.
	 */
	devMode: boolean;
	/**
	 * Withdrawal transaction receipt URL.
	 */
	receiptUrl: string;
	/**
	 * Transaction type. It will always be 'WITHDRAW'.
	 */
	kind: 'WITHDRAW';
	/**
	 * Withdrawal value in cents.
	 */
	amount: number;
	/**
	 * Platform fee charged for withdrawal in cents.
	 */
	platformFee: number;
	/**
	 * Unique identifier of the withdrawal in your system. Optional.
	 */
	externalId?: string;
	/**
	 * Date and time of withdrawal creation.
	 */
	createdAt: string;
	/**
	 * Date and time of last withdrawal update.
	 */
	updatedAt: string;
}

/**
 * https://docs.abacatepay.com/pages/withdraw/reference#atributos
 */
export enum WithdrawStatus {
	Pending = 'PENDING',
	Expired = 'EXPIRED',
	Cancelled = 'CANCELLED',
	Complete = 'COMPLETE',
	Refunded = 'REFUNDED',
}
