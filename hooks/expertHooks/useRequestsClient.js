import { getRequestsClientApi } from "@/services/expertApi/requestsClientService";
import { useQuery } from "@tanstack/react-query";

export function useGetRequestsClient() {
  const { data:requestsClient, isLoading } = useQuery({
    queryKey: ["requests-client"],
    queryFn: getRequestsClientApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { requestsClient, isLoading };
}
