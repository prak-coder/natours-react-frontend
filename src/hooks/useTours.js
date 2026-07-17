import { useState, useEffect } from "react";
import { getTours } from "../services/apiTours";

export function useTours() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTours();
        setTours(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTours();
  }, []);

  return { tours, isLoading, error };
}
