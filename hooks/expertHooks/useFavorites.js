import { getUserFavorites } from "@/services/authService";
import { getPopularFavorites } from "@/services/expertApi/favoritesService";
import { useQuery } from "@tanstack/react-query";

export function usePopularFavorites() {
  const { data, isLoading: isGetPopular } = useQuery({
    queryKey: ["get-popular-favorites"],
    queryFn: getPopularFavorites,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: list } = data || {};

  const popularList =
    !isGetPopular &&
    list.map((item) => {
      return { value: item.id, label: item.name };
    });

  return { list, popularList, isGetPopular };
}

export function useGetFavorites() {
  const { data, isLoading: isGetFavorites } = useQuery({
    queryKey: ["get-user-favorites"],
    queryFn: getUserFavorites,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: favorites } = data || {};

  return { favorites, isGetFavorites };
}
