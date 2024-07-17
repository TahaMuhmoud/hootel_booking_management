import { useMutation, useQueryClient } from "react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const qClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isUpdating } = useMutation(
    ({ id, data }) => {
      let keys = Object.keys(data);

      if (keys.length > 0) updateSettingsApi({ id, newSettings: data });
      else toast.error("No settings to update");
    },
    {
      onSuccess() {
        qClient.invalidateQueries();
      },
      onError(err) {
        toast.error(err);
      },
      onMutate({ data }) {
        let keys = Object.keys(data);
        if (keys.length > 0) toast.success("Settings Updated Successfully");
      },
    }
  );
  return { updateSettings, isUpdating };
}
