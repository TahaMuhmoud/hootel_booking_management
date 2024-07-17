import { useMutation, useQueryClient } from "react-query";
import { addGuest } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useAddGuest() {
  const qClient = useQueryClient();
  const { mutate, isGuestAddLoading } = useMutation(
    (newGuest) => {
      addGuest(newGuest);
    },
    {
      onSuccess: () => {
        qClient.invalidateQueries();
        toast.success("added successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    }
  );
  function addGuestOnSubmit(formData) {
    mutate({
      fullName: formData.fullName,
      email: formData.email,
      nationality: formData.nationality,
      natID: formData.natID,
      avatar: formData.avatar[0],
      countryFlag: formData.countryFlag[0],
    });
  }
  return { addGuestOnSubmit, isGuestAddLoading };
}
