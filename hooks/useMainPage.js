import { getMainPage } from "@/services/authService";
import {
  filterRequests,
  getAllRequests,
  getCategoryChild,
  getCategoryParents,
} from "@/services/mainPageService";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useMainPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-mainPage"],
    queryFn: getMainPage,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const {
    sliders,
    categories,
    posts,
    expertises,
    offer_categories,
    top_search,
    popular_week,
    new_register,
    what_service,
    banners,
  } = data?.data || {};

  const transformCategories =
    data &&
    categories.map((item) => ({
      value: item.id,
      label: item.name,
      parent_id: item.parent_id,
      children_recursive: item.children_recursive,
    }));

  return {
    isLoading,
    sliders,
    categories,
    transformCategories,
    posts,
    expertises,
    offer_categories,
    top_search,
    popular_week,
    new_register,
    what_service,
    banners,
  };
}

export function useCategoryChild(categoryId) {
  const { data: categoryData, isLoading: isGetCateChild } = useQuery({
    queryKey: ["get-category-child", categoryId],
    queryFn: () => getCategoryChild(categoryId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: categoryChilds } = categoryData || {};

  return { isGetCateChild, categoryChilds };
}

export function useCategoryParents(categoryId) {
  const { data: categoryData, isLoading: isGetCateParent } = useQuery({
    queryKey: ["get-category-parents", categoryId],
    queryFn: () => getCategoryParents(categoryId),
    retry: false,
    enabled: categoryId ? true : false,
    refetchOnWindowFocus: true,
  });

  const { data: categoryParents } = categoryData || {};

  return { isGetCateParent, categoryParents };
}

export function useGetAllRequests() {
  const { data: reqeustsData, isLoading } = useQuery({
    queryKey: ["get-all-requests"],
    queryFn: getAllRequests,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { requests } = reqeustsData || {};

  return { requests, isLoading };
}
