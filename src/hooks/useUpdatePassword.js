import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePasswordApi } from "../services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      alert("Password updated successfully!");
      // Invalidates user cache to sync the global state if needed
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to update password.";
      alert(message);
    },
  });
}
