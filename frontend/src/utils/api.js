const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function apiFetch(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
  });
  if (response.status === 401 || response.status === 403) {
    return null;
  }
  return response;
}
