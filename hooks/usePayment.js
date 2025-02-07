import { getShippingSettings } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export function useGetShippingSetting() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-shippint-setting"],
    queryFn: getShippingSettings,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading };
}
