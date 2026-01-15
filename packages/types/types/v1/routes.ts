import type {
	RESTGetCheckQRCodePixStatusQueryParams,
	RESTGetSearchWithdrawQueryParams,
	RESTPostSimulatePaymentQueryParams,
} from './rest';

export const Routes = {
	customer: {
		/**
		 * POST - https://api.abacatepay.com/v1/customer/create
		 */
		create: '/customer/create',

		/**
		 * GET - https://api.abacatepay.com/v1/customer/list
		 */
		list: '/customer/list',
	},
	billing: {
		/**
		 * POST - https://api.abacatepay.com/v1/billing/create
		 */
		create: '/billing/create',

		/**
		 * GET - https://api.abacatepay.com/v1/billing/list
		 */
		list: '/billing/list',
	},
	pix: {
		/**
		 * POST - https://api.abacatepay.com/v1/pixQrCode/create
		 */
		createQRCode: '/pixQrCode/create',

		/**
		 * POST - https://api.abacatepay.com/v1/pixQrCode/simulate-payment
		 */
		simulatePayment({ id }: RESTPostSimulatePaymentQueryParams) {
			return `/pixQrCode/simulate-payment?id=${id}` as const;
		},

		/**
		 * GET - https://api.abacatepay.com/v1/pixQrCode/check
		 */
		checkStatus({ id }: RESTGetCheckQRCodePixStatusQueryParams) {
			return `/pixQrCode/check?id=${id}` as const;
		},
	},
	coupon: {
		/**
		 * POST - https://api.abacatepay.com/v1/coupon/create
		 */
		create: '/coupon/create',

		/**
		 * GET - https://api.abacatepay.com/v1/coupon/list
		 */
		list: '/coupon/list',
	},
	withdraw: {
		/**
		 * POST - https://api.abacatepay.com/v1/withdraw/create
		 */
		create: '/withdraw/create',

		/**
		 * GET - https://api.abacatepay.com/v1/withdraw/get
		 */
		get({ externalId }: RESTGetSearchWithdrawQueryParams) {
			return `/withdraw/get?externalId=${externalId}` as const;
		},

		/**
		 * GET - https://api.abacatepay.com/v1/withdraw/list
		 */
		list: '/withdraw/list',
	},
	store: {
		/**
		 * GET - https://api.abacatepay.com/v1/store/get
		 */
		get: '/store/get',
	},
	mrr: {
		/**
		 * GET - https://api.abacatepay.com/v1/public-mrr/mrr
		 */
		get: '/public-mrr/mrr',

		/**
		 * GET - https://api.abacatepay.com/v1/public-mrr/merchant-info
		 */
		merchant: '/public-mrr/merchant-info',

		/**
		 * GET - https://api.abacatepay.com/v1/public-mrr/renevue
		 */
		revenue: '/public-mrr/revenue',
	},
} as const;
