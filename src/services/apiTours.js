import apiClient from "./apiClient";

// 1. Get All Tours
export async function getAllTours() {
  const res = await apiClient.get("/tours");
  return res.data.data?.data || [];
}

// 2. Get Single Tour by ID
export async function getTour(id) {
  const res = await apiClient.get(`/tours/${id}`);
  return res.data.data?.data || null;
}

// 3. Create a Tour (Headers are now automatically handled by the interceptor!)
export async function createTour(tourData) {
  const res = await apiClient.post("/tours", tourData);
  return res.data.data?.data;
}
