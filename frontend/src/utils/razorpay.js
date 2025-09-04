// src/utils/razorpay.js
export function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(s);
  });
}

// Use THIS for recurring subscriptions
export async function openRazorpaySubscription({ keyOverride, subscription_id, email, onSuccess, onDismiss }) {
  await loadRazorpay();
  const key = keyOverride || import.meta?.env?.VITE_RAZORPAY_KEY_ID;
  if (!key) throw new Error("Missing Razorpay key");
  const options = {
    key,
    name: "The Amazing Pint – E‑Magazine",
    description: "Monthly Subscription",
    subscription_id,
    prefill: { email },
    modal: { ondismiss: onDismiss },
    handler: onSuccess,
  };
  new window.Razorpay(options).open();
}

// (Optional) Keep this ONLY if you also support one‑time orders elsewhere.
export async function openRazorpayOrder({ order, email, onSuccess, onDismiss }) {
  await loadRazorpay();
  const key = import.meta?.env?.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxx";
  const options = {
    key,
    name: "The Amazing Pint – E‑Magazine",
    description: "One‑time Purchase",
    order_id: order.id,          // <-- correct field for orders
    amount: order.amount,
    currency: order.currency || "INR",
    prefill: { email },
    modal: { ondismiss: onDismiss },
    handler: onSuccess,
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}
