import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "react-query";

export function useRecentBookings() {
  const [SearchParams] = useSearchParams();
  const numDays = Number(SearchParams.get("last")) || 7;

  let date = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery(
    ["bookings", `last-${numDays}`],
    () => getBookingsAfterDate(date)
  );

  return { bookings, isLoading, numDays };
}
