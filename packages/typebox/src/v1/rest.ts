import { type Static, type TAnySchema, Type as t } from '@sinclair/typebox';
import { StringEnum } from '../utils';
import {
	APICharge,
	APICoupon,
	APICustomer,
	APIProduct,
	APIQRCodePIX,
	APIStore,
	APIWithdraw,
	CouponDiscountKind,
	PaymentFrequency,
	PaymentMethod,
	PaymentStatus,
} from '.';

/**
 * Any response returned by the AbacatePay API
 */
export const APIResponse = <Schema extends TAnySchema>(schema: Schema) =>
	t.Union([
		t.Object({
			data: schema,
			error: t.Null({
				description: 'Error message returned from the API.',
			}),
		}),
		t.Object({
			data: t.Null(),
			error: t.String({
				description: 'Error message returned from the API.',
			}),
		}),
	]);

export type APIResponse<Schema extends TAnySchema> = Static<
	ReturnType<typeof APIResponse<Schema>>
>;

export const RESTPostCreateCustomerBody = t.Pick(APICustomer, ['metadata']);

export const RESTPostCreateCustomerData = APIResponse(APICustomer);

export const RESTPostCreateNewChargeBody = t.Object({
	methods: t.Array(PaymentMethod, {
		description:
			'Payment methods that will be used. Currently, only `PIX` is supported, `CARD` is in beta.',
	}),
	frequency: PaymentFrequency,
	products: t.Array(APIProduct, {
		minItems: 1,
		description: 'List of products your customer is paying for.',
	}),
	returnUrl: t.String({
		format: 'uri',
		description:
			'URL to redirect the customer if they click on the "Back" option.',
	}),
	completionUrl: t.String({
		format: 'uri',
		description: 'URL to redirect the customer when payment is completed.',
	}),
	customerId: t.Optional(
		t.String({
			description: 'The ID of a customer already registered in your store.',
		}),
	),
	customer: t.Optional(
		t.Pick(APICustomer, ['metadata'], {
			description: "Your customer's data to create it.",
		}),
	),
	allowCoupons: t.Optional(
		t.Boolean({ description: 'If true coupons can be used in billing.' }),
	),
	coupons: t.Optional(
		t.Array(t.String(), {
			description:
				'List of coupons available for resem used with billing (0-50 max.).',
		}),
	),
	externalId: t.Optional(
		t.String({
			description:
				'If you have a unique identifier for your billing application, completely optional.',
		}),
	),
	metadata: t.Optional(
		t.Record(t.String(), t.Any(), {
			description: 'Optional billing metadata.',
		}),
	),
});

export const RESTPostCreateNewChargeData = APIResponse(APICharge);

export const RESTPostCreateQRCodePixBody = t.Intersect([
	t.Pick(RESTPostCreateNewChargeBody, ['customer', 'metadata']),
	t.Object({
		amount: t.Integer({
			description: 'Charge amount in cents',
		}),
		expiresIn: t.Optional(
			t.Integer({
				description: 'Billing expiration time in seconds.',
			}),
		),
		description: t.Optional(
			t.String({
				description: 'Message that will appear when paying the PIX.',
			}),
		),
	}),
]);

export const RESTPostCreateQRCodePixData = APIResponse(APIQRCodePIX);

export const RESTPostSimulatePaymentQueryParams = t.Object({
	id: t.String({
		description: 'QRCode Pix ID.',
	}),
});

export const RESTPostSimulatePaymentData = APIResponse(APIQRCodePIX);

export const RESTGetCheckQRCodePixStatusQueryParams = t.Object({
	id: t.String({
		description: 'QRCode Pix ID.',
	}),
});

export const RESTGetCheckQRCodePixStatusData = APIResponse(
	t.Object({
		expiresAt: t.Date({
			description: 'QRCode Pix expiration date.',
		}),
		status: PaymentStatus,
	}),
);

export const RESTGetListBillingsData = APIResponse(t.Array(APICharge));

export const RESTGetListCustomersData = APIResponse(t.Array(APICustomer));

export const RESTPostCreateCouponBody = t.Object({
	data: t.Object(
		{
			code: t.String({
				examples: ['DEYVIN_20'],
				description: 'Unique coupon identifier.',
			}),
			discount: t.Integer({
				description: 'Discount amount to be applied.',
			}),
			discountKind: CouponDiscountKind,
			notes: t.Optional(
				t.String({
					description: 'Coupon description.',
				}),
			),
			maxRedeems: t.Optional(
				t.Integer({
					minimum: -1,
					default: -1,
					description:
						'Number of times the coupon can be redeemed. -1 means this coupon can be redeemed without limits.',
				}),
			),
			metadata: t.Optional(
				t.Record(t.String(), t.Any(), {
					description: 'Key value object for coupon metadata.',
				}),
			),
		},
		{
			description: 'Coupon data.',
		},
	),
});

export const RESTPostCreateCouponData = APIResponse(APICoupon);

export const RESTPostCreateNewWithdrawBody = t.Object({
	externalId: t.String({
		description: 'Unique identifier of the withdrawal in your system.',
	}),
	method: t.Literal('PIX', {
		description: 'Withdrawal method available.',
	}),
	amount: t.Integer({
		minimum: 350,
		description: 'Withdrawal value in cents (Min 350).',
	}),
	pix: t.Object(
		{
			type: StringEnum(
				['CPF', 'CNPJ', 'PHONE', 'EMAIL', 'RANDOM', 'BR_CODE'],
				'PIX key type.',
			),
			key: t.String({
				description: 'PIX key value.',
			}),
		},
		{
			description: 'PIX key data to receive the withdrawal.',
		},
	),
	description: t.Optional(
		t.String({
			description: 'Optional description of the withdrawal.',
		}),
	),
});

export const RESTPostCreateNewWithdrawData = APIResponse(APIWithdraw);

export const RESTGetSearchWithdrawQueryParams = t.Object({
	externalId: t.String({
		description: 'Unique identifier of the withdrawal in your system.',
	}),
});

export const RESTGetRevenueByPeriodQueryParams = t.Object({
	startDate: t.String({
		description: 'Period start date (YYYY-MM-DD format).',
	}),
	endDate: t.String({
		description: 'Period end date (YYYY-MM-DD format).',
	}),
});

export const RESTGetMerchantData = APIResponse(
	t.Object({
		name: t.String({
			description: 'Store name.',
		}),
		website: t.String({
			format: 'uri',
			description: 'Store website.',
		}),
		createdAt: t.Date({
			description: 'Store creation date.',
		}),
	}),
);

export const RESTGetMRRData = APIResponse(
	t.Object({
		mrr: t.Integer({
			description:
				'hly recurring revenue in cents. Value 0 indicates that there is no recurring revenue at the moment.',
		}),
		totalActiveSubscriptions: t.Integer({
			description:
				'Total active subscriptions. Value 0 indicates that there are no currently active subscriptions.',
		}),
	}),
);

export const RESTGetStoreDetailsData = APIResponse(APIStore);

export const RESTGetListWithdrawsData = APIResponse(t.Array(APIWithdraw));

export const RESTGetListCouponsData = APIResponse(t.Array(APICoupon));
