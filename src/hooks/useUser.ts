import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiUser";

export function useUser() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  return { data, error, isLoading };
}
