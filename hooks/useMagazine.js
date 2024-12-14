import { getAllMagazineApi } from "@/services/magazineService";
import { useQuery } from "@tanstack/react-query";

export default function useMagazine() {
  const { data: magazineData, isLoading } = useQuery({
    queryKey: ["get-all-magazine"],
    queryFn: getAllMagazineApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { magazineData, isLoading };
}
