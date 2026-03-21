export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  return response;
}
