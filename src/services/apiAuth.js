import apiClient from "./apiClient";

// 1. Submit login credentials to get a JWT token
export async function loginApi({ email, password }) {
  const res = await apiClient.post("/users/login", { email, password });
  return res.data; // Contains 'token' and 'data.user' from Jonas' API standard
}

// 2. Fetch current logged-in user profile details
export async function getMeApi() {
  const res = await apiClient.get("/users/me");
  return res.data.data?.data || null;
}
