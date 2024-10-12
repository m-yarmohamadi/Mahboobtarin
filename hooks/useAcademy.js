import {
  getAcademyCategoryApi,
  getAllAcademyApi,
} from "@/services/academyService";
import { useQuery } from "@tanstack/react-query";

export function useGetAcademyCategory() {
  const { data, isLoading: isGetCategory } = useQuery({
    queryKey: ["get-academy-categories"],
    queryFn: getAcademyCategoryApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const categories =
    data && data?.data.map((item) => ({ value: item.id, label: item.name }));

  return { categories, isGetCategory };
}

export function useDashboardAcademy(qs) {
  const { data: academyData, isLoading } = useQuery({
    queryKey: ["get-dashboard-academy", qs],
    queryFn: () => getAllAcademyApi(qs),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: academy } = academyData || {};

  return { academy, isLoading };
}
