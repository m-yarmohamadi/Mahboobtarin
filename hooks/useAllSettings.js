import { getAllSettings } from "@/services/mainPageService";
import { useQuery } from "@tanstack/react-query";

export default function useAllSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-settings"],
    queryFn: getAllSettings,
    retry: false,
    refetchOnWindowFocus: true,
  });

  if(!isLoading) return data || {};
}
