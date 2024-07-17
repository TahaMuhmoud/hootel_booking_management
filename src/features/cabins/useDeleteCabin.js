import { useMutation, useQueryClient } from "react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const qClient = useQueryClient();
  const { mutate: delteCabin, isLoading: isDeleting } = useMutation(
    (id) => {
      deleteCabinApi(id);
    },
    {
      onSuccess: () => {
        qClient.invalidateQueries();
        toast.success("deleted successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { delteCabin, isDeleting };
}
