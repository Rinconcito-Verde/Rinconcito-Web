const STRIPE_API_BASE = "https://api.stripe.com/v1";

async function request(
  stripeSecretKey: string,
  endpoint: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  body?: Record<string, any>
) {
  const headers = {
    Authorization: `Bearer ${stripeSecretKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const formBody = body
    ? Object.entries(body)
        .map(([key, value]) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
        )
        .join("&")
    : undefined;

  const response = await fetch(`${STRIPE_API_BASE}${endpoint}`, {
    method,
    headers,
    body: method === "GET" ? undefined : formBody,
  });

  const data: any = await response.json();

  if (!response.ok) {
    throw {
      error: "Stripe API error",
      status: response.status,
      message: data.error?.message || "Unknown error",
      raw: data,
    };
  }

  return data;
}

export async function createPaymentIntent(
  stripeSecretKey: string,
  paymentData: {
    amount: number;
    currency: string;
    customer?: string;
    payment_method_types?: string[];
    automatic_payment_methods?: { enabled: boolean },
    description?: string;
    metadata?: Record<string, string>;
  }
) {
  const payload: Record<string, any> = {
    amount: paymentData.amount,
    currency: paymentData.currency,
  };

  if (paymentData.description) {
    payload.description = paymentData.description;
  }

  if (paymentData.customer) {
    payload.customer = paymentData.customer;
  }

  if (paymentData.payment_method_types?.length) {
    paymentData.payment_method_types.forEach((type, index) => {
      payload[`payment_method_types[${index}]`] = type;
    });
  } else {
    payload["automatic_payment_methods[enabled]"] = "true";
  }

  if (paymentData.metadata) {
    Object.entries(paymentData.metadata).forEach(([key, value]) => {
      payload[`metadata[${key}]`] = value;
    });
  }

  return request(stripeSecretKey, "/payment_intents", "POST", payload);
}

export async function retrievePaymentIntent(
  stripeSecretKey: string,
  paymentIntentId: string
) {
  return request(
    stripeSecretKey,
    `/payment_intents/${paymentIntentId}`,
    "GET"
  );
}