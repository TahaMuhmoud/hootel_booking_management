import { useQuery } from "react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { data: settings, isLoading: isLoadingSettings } = useQuery(
    "settings",
    getSettings
  );
  return { settings, isLoadingSettings };
}
