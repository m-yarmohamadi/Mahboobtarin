import { getAllNotifsApi } from "@/services/expertApi/notificationService";
import { useQuery } from "@tanstack/react-query";

export function useGetAllNotifs() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-notifs"],
    queryFn: getAllNotifsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { notifications } = data || {};

  return { notifications, isLoading };
}
