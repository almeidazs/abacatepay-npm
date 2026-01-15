import type { APICoupon } from './coupon';
import type { APICustomer } from './customer';

/**
 * https://docs.abacatepay.com/pages/payment/reference#estrutura
 */
export interface APICharge {
	/**
	 * Unique billing ID at AbacatePay.
	 */
	id: string;
	/**
	 * Billing frequency. It can be `ONE_TIME` or `MULTIPLE_PAYMENTS`.
	 *
	 * @see {@link PaymentFrequency}
	 */
	frequency: PaymentFrequency;
	/**
	 * URL for your customer to make payment for the charge.
	 */
	url: string;
	/**
	 * Billing status. Can be `PENDING`, `EXPIRED`, `CANCELLED`, `PAID`, `REFUNDED`.
	 *
	 * @see {@link PaymentStatus}
	 */
	status: PaymentStatus;
	/**
	 * Indicates whether the charge was created in a development (true) or production (false) environment.
	 */
	devMode: boolean;
	/**
	 * Supported payment types: `PIX` and `CARD` (beta).
	 *
	 * @see {@link PaymentMethod}
	 */
	methods: PaymentMethod[];
	/**
	 * List of products included in the charge.
	 */
	products: APIProduct[];
	/**
	 * Customer you are billing. Optional. See structure reference [here](https://docs.abacatepay.com/pages/payment/client/reference.mdx).
	 */
	customer: APICustomer;
	/**
	 * Object with metadata about the charge.
	 */
	metadata: {
		/**
		 * Fee applied by AbacatePay.
		 */
		fee: number;
		/**
		 * URL that the customer will be redirected to when clicking the “back” button.
		 */
		returnUrl: string;
		/**
		 * URL that the customer will be redirected to when making payment.
		 */
		completionUrl: string;
	};
	/**
	 * Date and time of next charge, or null for one-time charges.
	 */
	nextBilling: string | null;
	/**
	 * Whether or not to allow coupons for billing.
	 */
	allowCoupons: boolean | null;
	/**
	 * Coupons allowed in billing. Coupons are only considered if `allowCoupons` is true.
	 */
	coupons: APICoupon[];
	/**
	 * Charge creation date and time.
	 */
	createdAt: string;
	/**
	 * Charge last updated date and time.
	 */
	updatedAt: string;
}

export interface APIProduct {
	/**
	 * The product id on your system. We use this id to create your product on AbacatePay automatically, so make sure your id is unique.
	 *
	 * @example "prod-1234"
	 */
	externalId: string;
	/**
	 * Product name.
	 *
	 * @example "Assinatura de Programa Fitness"
	 */
	name: string;
	/**
	 * Quantity of product being purchased.
	 *
	 * @example 2
	 */
	quantity: number;
	/**
	 * Price per unit of product in cents. The minimum is 100 (1 BRL).
	 */
	price: number;
	/**
	 * Detailed product description.
	 */
	description?: string;
}

/**
 * https://docs.abacatepay.com/pages/payment/reference#atributos
 */
export enum PaymentStatus {
	Pending = 'PENDING',
	Expired = 'EXPIRED',
	Cancelled = 'CANCELLED',
	Paid = 'PAID',
	Refunded = 'REFUNDED',
}

/**
 * https://docs.abacatepay.com/pages/payment/create#body-methods
 */
export enum PaymentMethod {
	Pix = 'PIX',
	Card = 'CARD',
}

/**
 * https://docs.abacatepay.com/pages/payment/create#body-frequency
 */
export enum PaymentFrequency {
	OneTime = 'ONE_TIME',
	Multiple = 'MULTIPLE_PAYMENTS',
}
