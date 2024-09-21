import {
  getExpertisesList,
  getExpertiseUserById,
  getExpertiseUsers,
} from "@/services/usersService";
import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";

export function useGetExpertiseAllUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-expertise-users"],
    queryFn: getExpertiseUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
}

export default function useGetExpertiseUser(id) {
  const { user } = useProfile();
  const { data, isLoading } = useQuery({
    queryKey: ["get-expertise-user-by-id", id],
    queryFn: () => getExpertiseUserById(id, user?.id),
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

  const transformExpertises =
    !isLoading &&
    data.map((item) => ({
      value: item.title,
      label: item.title,
    }));

  return { data, isLoading, transformExpertises };
}
