import { useMutation, useQueryClient } from "react-query";
import { logout as apiLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLogingOut } = useMutation(
    () => apiLogout(),
    {
      onSuccess() {
        navigate("/login");
        queryClient.invalidateQueries();
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { logout, isLogingOut };
}
