import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeApi } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeApi,
    onSuccess: (updatedUser) => {
      // ⚡ Instantly update your global context/cache with the brand new data
      queryClient.setQueryData(["user"], updatedUser);
      alert("🎉 Account configurations updated successfully!");
    },
    onError: (err) => {
      alert(`❌ Update failed: ${err.message}`);
    },
  });
}
