import { useMutation, useQueryClient } from "react-query";
import { deleteBook as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBook() {
  const qClient = useQueryClient();
  const { mutate: delteBook, isLoading: isDeleting } = useMutation(
    (id) => {
      deleteBookingApi(id);
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
  return { delteBook, isDeleting };
}
