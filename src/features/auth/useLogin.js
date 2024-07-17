import { useMutation, useQueryClient } from "react-query";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoging } = useMutation(
    (values) => apiLogin(values),
    {
      onSuccess() {
        queryClient.invalidateQueries();
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { login, isLoging };
}
