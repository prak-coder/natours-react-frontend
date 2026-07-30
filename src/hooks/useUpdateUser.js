import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { updateMeApi } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { updateUser: updateAuthUser } = useAuth();

  return useMutation({
    mutationFn: updateMeApi,
    onSuccess: (updatedUser) => {
      if (updatedUser) {
        queryClient.setQueryData(["user"], updatedUser);
        if (typeof updateAuthUser === "function") {
          updateAuthUser(updatedUser);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("🎉 Account configurations updated successfully!");
    },
    onError: (err) => {
      alert(`❌ Update failed: ${err.message}`);
    },
  });
}
