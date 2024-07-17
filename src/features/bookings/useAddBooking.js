import { useMutation, useQueryClient } from "react-query";
import { addBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useAddBooking() {
  const qClient = useQueryClient();
  const { mutate, isLoading: isBookAdding } = useMutation(
    (newBook) => {
      addBooking(newBook);
    },
    {
      onSuccess: () => {
        qClient.invalidateQueries();
        toast.success("new booking added successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );

  return { mutate, isBookAdding };
}
