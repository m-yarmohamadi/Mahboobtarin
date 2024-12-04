import {
  getAllProductsApi,
  getBestSellProducts,
  getProductCategoryApi,
  getProductsBestPrice,
  getProductsBestSell,
  getShopPage,
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

export function useGetProductsBestPrice() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["get-products-best-price"],
    queryFn: getProductsBestPrice,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: productsList } = productsData || {};

  return { productsList, isLoading };
}

export function useGetProductsBestSell() {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["get-products-best-sell"],
    queryFn: getProductsBestSell,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: productsList } = productsData || {};

  return { productsList, isLoading };
}

export function useShopPage() {
  const { data: shopData, isLoading } = useQuery({
    queryKey: ["get-shop-page"],
    queryFn: getShopPage,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { shopData, isLoading };
}

// **********************************
// * expert dashboard ****************
// **********************************

export function useGetProductCategory() {
  const { data, isLoading: isGetCategory } = useQuery({
    queryKey: ["get-product-categories"],
    queryFn: getProductCategoryApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const categories =
    data && data?.data.map((item) => ({ value: item.id, label: item.name }));

  return { categories, isGetCategory };
}

export function useDashboardProducts(qs) {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["get-dashboard-products", qs],
    queryFn: () => getAllProductsApi(qs),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: products } = productsData || {};

  return { products, isLoading };
}
