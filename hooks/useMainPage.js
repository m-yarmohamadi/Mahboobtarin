import { getMainPage } from "@/services/authService";
import { getCategoryChild } from "@/services/mainPageService";
import { useQuery } from "@tanstack/react-query";

export default function useMainPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-mainPage"],
    queryFn: getMainPage,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { sliders, categories, posts, expertises } = data?.data || {};

  const transformCategories =
    data && categories.map((item) => ({ value: item.id, label: item.name }));

  return {
    isLoading,
    sliders,
    categories,
    transformCategories,
    posts,
    expertises,
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
