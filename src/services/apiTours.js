const API_URL = import.meta.env.VITE_API_URL || "";

export async function getTours() {
  try {
    // Works with either your direct .env URL or your Vite proxy configuration
    const res = await fetch(`${API_URL}/api/v1/tours`);

    if (!res.ok) throw new Error("Could not fetch tours data");
    const jsonResponse = await res.json();

    // 💡 THE EXACT FIX: Extracts the inner 'data' array field
    const toursArray = jsonResponse.data?.data || [];

    return toursArray;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
