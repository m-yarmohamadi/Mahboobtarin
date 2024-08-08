import { getBestSellProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useGetBestSellProducts() {
    const { data:products, isLoading } = useQuery({
      queryKey: ["get-best-sell-products"],
      queryFn: getBestSellProducts,
      retry: false,
      refetchOnWindowFocus: true,
    });
  
    return { products, isLoading };
  }
  