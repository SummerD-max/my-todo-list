import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiUser";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      queryClient.setQueryData(["user"], data.user);
      navigate("/app", { replace: true });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  return { login, isPending, isError };
}
