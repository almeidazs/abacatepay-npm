<div align="center">

## AbacatePay API Types

Tipagens oficiais e helpers modernos para integrar com a API da AbacatePay.

<img src="https://res.cloudinary.com/dkok1obj5/image/upload/v1767631413/avo_clhmaf.png" width="100%" alt="AbacatePay Open Source"/>

## Instalação

Use com o seu *package manager* favorito

</div>

```bash
bun add @abacatepay/types
pnpm add @abacatepay/types
npm install @abacatepay/types
```

<div align="center">

## Como a AbacatePay API Types documenta

Antes de tudo, você deve específicar a versão da API que você deseja importar os tipos. Coloque `/v*` no final da importação, sendo `*` a versão que deseja usar:

</div>

```ts
import { APICustomer } from '@abacatepay/types/v1'
```


<p align="center">Para tipos globais como <code>API_BASE_URL</code>, <code>API_VERSION</code>, <code>version</code> e <code>Routes</code>, apenas import normalmente sem a versão.</p>

```ts
import { version } from '@abacatepay/types'
```

- Prefixo `API*`
Representa estruturas gerais da API (Objetos retornados, modelos internos etc.).

- Prefixo `Webhook*`
Representa payloads recebidos pelos eventos de webhook.
Documentação: https://docs.abacatepay.com/pages/webhooks

- Prefixo `REST<HTTPMethod>*`
Tipos usados em requisições diretas à API.
  - Sufixo Body → corpo enviado na requisição
  Ex.: `RESTPostCreateNewChargeBody`

  - Sufixo `QueryParams` → parâmetros de query
  Ex.: `RESTGetCheckQRCodePixStatusQueryParams`

  - Sufixo `Data` → dados retornados pela API
  Ex.: `RESTGetListCouponsData`

- O pacote **NÃO adiciona tipos além do que existe na documentação oficial**.
Cada tipo reflete exatamente o que está documentado aqui:
https://docs.abacatepay.com/pages/introduction

- Campos marcados com `@unstable`
São campos que não têm definição formal na documentação, mas cujo tipo foi inferido com base nos exemplos oficiais.
(Ex.: `WebhookWithdrawDoneEvent.billing.kind`)

<h2 align="center">Quickstart</h2>

<p align="center"><strong>Crie um novo cupom</strong></p>

```ts
import {
	API_BASE,
	API_VERSION,
	type APICoupon,
	type RESTPostCreateCouponBody,
	Routes,
} from '@abacatepay/types/v1';

async function createCoupon(body: RESTPostCreateCouponBody) {
	const path = `${API_BASE_URL}/${API_VERSION}/${Routes.coupon.create}`;

	const response = await fetch(path, {
		method: 'POST',
		body: JSON.stringify(body),
	});

	const data: APICoupon = await response.json();

	return data;
}
```

<p align="center"><strong>Crie um servidor e escute eventos de Webhooks do Aabacate</strong></p>

```ts
import { type WebhookEvent, WebhookEventType } from '@abacatepay/types/v1';

Bun.serve({
    routes: {
        async '/webhooks/abacate'(request) {
            const { data, event }: WebhookEvent = await request.json();

            switch (event) {
                case WebhookEventType.BillingPaid:
                    console.log(`Um novo pagamento de ${data.payment.amount} foi feito`);

                    break;
                case WebhookEventType.WithdrawDone:
                    console.log(`Um novo saque foi feito ${data.transaction.receiptUrl}`);

                    break;
                case WebhookEventType.WithdrawFailed:
                    console.log(`O saque com o ID ${data.transaction.id} falhou`);
            }

            return new Response('OK');
        },
    },
});
```
