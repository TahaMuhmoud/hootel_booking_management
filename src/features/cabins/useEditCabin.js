import { useMutation, useQueryClient } from "react-query";
import { editCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const qClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation(
    (data) => editCabinApi(data),
    {
      onSuccess() {
        qClient.invalidateQueries();
        toast.success("edited successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { editCabin, isEditing };
}
