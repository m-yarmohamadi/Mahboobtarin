import { getExpertiseUserById } from "@/services/usersService";
import { useQuery } from "@tanstack/react-query";

export default function useGetExpertiseUser(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-expertise-user-by-id", id],
    queryFn: () => getExpertiseUserById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
}
