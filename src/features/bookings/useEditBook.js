import { useMutation, useQueryClient } from "react-query";
import { editBook as editBookApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useEditBook() {
  const qClient = useQueryClient();
  const { mutate: editBook, isLoading: isEditing } = useMutation(
    (data) => {
      editBookApi(data);
    },
    {
      onSuccess() {
        qClient.invalidateQueries();
        toast.success("updated successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  return { editBook, isEditing };
}
