import {
  getBestSellProducts,
  getProductCategoryApi,
} from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useGetBestSellProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["get-best-sell-products"],
    queryFn: getBestSellProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { products, isLoading };
}

export function useGetProductCategory() {
  const { data: categories, isLoading: isGetCategory } = useQuery({
    queryKey: ["get-product-categories"],
    queryFn: getProductCategoryApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { categories, isGetCategory };
}
