const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://backend/backend";
export const isStaticMode = import.meta.env.VITE_STATIC_DATA === "true";

export async function apiGet(endpoint) {
  if (isStaticMode) throw new Error("Static demo mode");

  const response = await fetch(`${API_BASE}/${endpoint}`);
  if (!response.ok) throw new Error(`Server returned ${response.status}`);
  return response.json();
}

export async function apiPost(endpoint, body) {
  if (isStaticMode) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: "Demo mode" };
  }

  const response = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Server returned ${response.status}`);
  }
  return data;
}
