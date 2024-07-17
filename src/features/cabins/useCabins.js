import { useQuery, useQueryClient } from "react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const qClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { data: { cabins, count } = {}, isLoading: isLoadingCabins } = useQuery(
    ["cabins", page],
    () => getCabins({ page }),
    {
      onSuccess() {
        qClient.invalidateQueries();
      },
    }
  );

  return { cabins, count, isLoadingCabins };
}
