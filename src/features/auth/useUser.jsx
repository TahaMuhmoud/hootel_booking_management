import { useQuery } from "react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading: isUserLoading } = useQuery("user", getUser);

  return {
    user,
    isUserLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
