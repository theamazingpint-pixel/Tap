import { apiFetch } from "./fetchClient";

export const SummaryApi = {
  signup: (email, password) =>
    apiFetch("/auth/signup", { method: "POST", body: { email, password } }),

  login: (email, password) =>
    apiFetch("/auth/login", { method: "POST", body: { email, password } }),

  me: () => apiFetch("/auth/me"),

  createSubscription: (plan_id) =>
    apiFetch("/payments/create-subscription", { method: "POST", body: { plan_id } }),

  verifySubscription: (payload) =>
    apiFetch("/payments/verify-subscription", { method: "POST", body: payload }),
};
