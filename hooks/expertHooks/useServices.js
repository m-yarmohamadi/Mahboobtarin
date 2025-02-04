import { useQuery } from "@tanstack/react-query";
import {
  getAllServices,
  getServiceById,
  getServiceItems,
  getServiceProfile,
} from "@/services/expertApi/specialistServices";

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

export function useGetServicesProfile(expertId, serviceId) {
  const { data, isLoading: isLoadingServices } = useQuery({
    queryKey: expertId
      ? ["get-services-profile", expertId]
      : ["get-services-profile"],
    queryFn: () => getServiceProfile(expertId, serviceId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: servicesData } = data || {};

  return { servicesData, isLoadingServices };
}

export function useGetServiceItems() {
  const { data, isLoading: isLoadServiceItems } = useQuery({
    queryKey: ["get-service-items"],
    queryFn: getServiceItems,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: list } = data || {};
  const serviceItems =
    !isLoadServiceItems &&
    list.map((item) => {
      return {
        value: item.title,
        label: item.title,
        type: item.type,
        id: item.id,
      };
    });

  return { serviceItems, isLoadServiceItems };
}
