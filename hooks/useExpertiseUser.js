import {
  getExpertisesList,
  getExpertiseUserById,
} from "@/services/usersService";
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

export function useGetExpertisesList() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-expertises-list"],
    queryFn: getExpertisesList,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const transformExpertises = !isLoading && data.map((item) => ({
    value: item.id.toString(),
    label: item.title,
  }));

  return { data, isLoading, transformExpertises };
}
