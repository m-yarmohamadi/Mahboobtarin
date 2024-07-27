import { getProfile } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user, grade, language, expertise } = data?.data || {};

  return { user, isLoading, grade, language, expertise };
}
