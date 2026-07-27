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

// 3. Submit registration details to create a brand new account
export async function signupApi({ name, email, password, passwordConfirm }) {
  const res = await apiClient.post("/users/signup", {
    name,
    email,
    password,
    passwordConfirm,
  });
  return res.data; // Returns 'token' and 'data.user' from Jonas's API schema
}

// 4. Update Current User Profile Data (Handles both text and file uploads)
export async function updateMeApi(formData) {
  const res = await apiClient.patch("/users/updateMe", formData, {
    headers: {
      // ⚡ REQUIRED for Multer file uploads on your Express backend
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data.user;
}
// to update password for loggedin user
export async function updatePasswordApi({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  const response = await apiClient.patch("/users/updateMyPassword", {
    currentPassword: passwordCurrent,
    newPassword: password,
    confirmPassword: passwordConfirm,
  });
  return response.data;
}
