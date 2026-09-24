// Small fetch wrapper that automatically attaches the JWT token
// saved in localStorage (set on login/signup) to every request.
// Use this for any new call to a protected backend route
// (bids, contracts, milestones, portfolio, upload).

const BASE_URL = "http://localhost:5000/api";

export async function apiRequest(path, { method = "GET", body, isFormData = false } = {}) {
  const token = localStorage.getItem("token");

  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
