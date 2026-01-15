/**
 * https://docs.abacatepay.com/pages/coupon/reference#estrutura
 */
export interface APICoupon {
	/**
	 * Unique coupon code that your customers will use to apply the discount.
	 */
	id: string;
	/**
	 * Type of discount applied by the coupon.
	 */
	discountKind: CouponDiscountKind;
	/**
	 * Discount amount. For `PERCENTAGE` use numbers from 1-100 (ex: 10 = 10%). For `FIXED` use the value in cents (ex: 500 = R$5.00).
	 */
	discount: number;
	/**
	 * Limit on the number of times the coupon can be used. Use `-1` for unlimited coupons or a specific number to limit usage.
	 */
	maxRedeems: number;
	/**
	 * Counter of how many times the coupon has been used by customers.
	 */
	redeemsCount: 0;
	/**
	 * Coupon status.
	 */
	status: 'ACTIVE' | 'DELETED' | 'DISABLED';
	/**
	 * Indicates whether the coupon was created in a development (true) or production (false) environment.
	 */
	devMode: boolean;
	/**
	 * Internal description of the coupon for your organization and control.
	 */
	notes?: string;
	/**
	 * Coupon creation date and time.
	 */
	createdAt: string;
	/**
	 * Coupon last updated date and time.
	 */
	updatedAt: string;
	/**
	 * Object to store additional information about the coupon, such as campaign, category, or other data relevant to your organization.
	 */
	metadata?: Record<string, unknown>;
}

/**
 * https://docs.abacatepay.com/pages/coupon/reference#atributos
 */
export enum CouponDiscountKind {
	Percentage = 'PERCENTAGE',
	Fixed = 'FIXED',
}
