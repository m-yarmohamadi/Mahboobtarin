import { getAllProvinces, getCity } from "@/services/cityService";
import { useQuery } from "@tanstack/react-query";

export function useGetProvinces() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-provinces"],
    queryFn: getAllProvinces,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: provinces } = data || {};
  const transformProvinces = data && provinces.map((item) => (
    {value:item.id, label:item.name, id:item.id}
  ))

  return { provinces, isLoading, transformProvinces };
}


export function useGetCity(provinceId) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-city-by-id", provinceId],
    queryFn: () => getCity(provinceId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: city } = data || {};
  const transformCity = data && city.map((item) => (
    {value:item.id, label:item.name, id:item.id}
  ))

  return { transformCity, isLoading };
}
