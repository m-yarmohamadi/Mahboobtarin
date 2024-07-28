import { getMainPage} from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export default function useMainPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-mainPage"],
    queryFn: getMainPage,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { sliders, categories, posts } = data?.data || {};

  return { isLoading, sliders, categories, posts };
}
