import { getRequestsList } from "@/services/expertApi/callingService";
import { useQuery } from "@tanstack/react-query";

export function useGetRequests() {
  const { data: requestsData, isLoading: isGetRequests } = useQuery({
    queryKey: ["get-requests"],
    queryFn: getRequestsList,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: requests } = requestsData || {};

  return { requests, isGetRequests };
}
