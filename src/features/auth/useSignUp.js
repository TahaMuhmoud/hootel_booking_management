import { useMutation, useQueryClient } from "react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const qClient = useQueryClient();
  const { mutate: signUp, isLoading } = useMutation((data) => signupApi(data), {
    onSuccess: () => {
      qClient.invalidateQueries();
      toast.success("signed up successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signUp, isLoading };
}
