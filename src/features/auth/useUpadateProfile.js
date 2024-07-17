import { useMutation, useQueryClient } from "react-query";
import { updateAcount } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpadateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation(
    (data) => updateAcount(data),
    {
      onSuccess() {
        queryClient.invalidateQueries();
        toast.success("Account Updated Successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { updateProfile, isUpdating };
}
