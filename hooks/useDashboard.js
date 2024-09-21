import { getUserFavorites } from "@/services/authService";
import {
  getAllServices,
  getPopularFavorites,
  getServiceById,
} from "@/services/expertDashboardService";
import { useQuery } from "@tanstack/react-query";

// * expert services
export function useGetServices() {
  const { data, isLoading: isLoadingServices } = useQuery({
    queryKey: ["get-services"],
    queryFn: getAllServices,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: servicesData } = data || {};

  return { servicesData, isLoadingServices };
}

export function useGetServiceById(serviceId) {
  const { data, isLoading: isLoadingService } = useQuery({
    queryKey: ["get-service-by-id", serviceId],
    queryFn: () => getServiceById(serviceId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: serviceData } = data || {};

  return { serviceData, isLoadingService };
}

// * expert favorites
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

  return {  favorites, isGetFavorites };
}
