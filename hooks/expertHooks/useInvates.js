import { getInvatedFriendsApi } from "@/services/expertApi/invatesService";
import { useQuery } from "@tanstack/react-query";

export function useGetInvatedFriends() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-invated-friends"],
    queryFn: getInvatedFriendsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { invited_users: invateds } = data || {};

  return { invateds, isLoading };
}
