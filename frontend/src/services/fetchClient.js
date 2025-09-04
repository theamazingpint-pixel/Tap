const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

export async function apiFetch(path, { method = "POST", body, headers } = {}) {
  const token = localStorage.getItem("auth_token");
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "omit", // IMPORTANT for CORS simplicity
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.msg || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
