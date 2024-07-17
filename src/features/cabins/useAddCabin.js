import { useMutation, useQueryClient } from "react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useAddCabin() {
  const qClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (newCabin) => {
      addCabin(newCabin);
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
  function addOnSubmit(formData) {
    mutate({
      name: formData.cabinName,
      regularPrice: formData.cabinPrice,
      discount: formData.cabinDiscount,
      maxCapacity: formData.cabinCapacity,
      image: formData.cabinImage[0],
      description: formData.cabinDescription,
    });
  }
  return { addOnSubmit, isLoading };
}
