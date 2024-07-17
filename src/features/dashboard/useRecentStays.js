import { useQuery } from "react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [SearchParams] = useSearchParams();
  const numDays = Number(SearchParams.get("last")) || 7;

  let date = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery(
    ["bookings", `last-${numDays}`],
    () => getStaysAfterDate(date)
  );

  const confirmedStays =
    stays?.filter(
      (item) => item.status === "check-in" || item.status === "check-out"
    ) || [];

  return { stays, isLoading, confirmedStays };
}
