import { useQuery } from "react-query";
import { getGuests } from "../../services/apiBookings";

export function useGuests() {
  const { data: guests, isLoading: isLoadingGuest } = useQuery(
    "guests",
    getGuests
  );

  return { guests, isLoadingGuest };
}
