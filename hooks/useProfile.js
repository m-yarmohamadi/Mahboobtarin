import { getDashboardSettings, getProfile, getUserAddress } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user, grade, language, expertise, address } = data?.data || {};

  return { user, isLoading, grade, language, expertise, address };
}

export function useGetAddress() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-user-address"],
    queryFn: getUserAddress,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: addressList } = data || {};

  return { addressList, isLoading };
}

export function useDashboardSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-dashboard-settings"],
    queryFn: getDashboardSettings,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: settings } = data || {};

  return { settings, isLoading };
}
