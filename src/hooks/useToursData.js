import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTours, getTour, createTour } from "../services/apitours";

// Hook for listing all tours
export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: getAllTours,
  });
}

// Hook for single tour inspection
export function useSingleTour(id) {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: () => getTour(id),
    enabled: !!id, // Only run the API request if an ID is actually passed
  });
}

// Hook for creating a tour (invalidates the main tour list on completion)
export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      // Tells TanStack to instantly background-refresh your tour grids
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}
