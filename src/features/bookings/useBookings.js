import { useQuery, useQueryClient } from "react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const qClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data: { bookings, count } = {}, isLoading: isLoadingBookings } =
    useQuery(["bookings", page], () => getBookings({ page }), {
      onSuccess() {
        qClient.invalidateQueries();
      },
    });

  return { bookings, count: count, isLoadingBookings };
};
