import { bookmarkApi, getBookmarksApi } from "@/services/expertApi/bookmarkService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useBookmark() {
  const { mutate, isPending: isBookmarking } = useMutation({
    mutationFn: bookmarkApi,
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const bookmarkHandler = (id) => {
    mutate(id, {
      onSuccess: ({ data }) => {
        router.replace(pathname, { scroll: false });
        queryClient.invalidateQueries({ queryKey: ["get-bookmarks"] });

        if (data.message[0] === "Marked Succesfully!") {
          toast.success("نشان شد");
        } else {
          toast.success("از نشان شده ها حذف شد");
        }
      },
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast.error("ابتدا وارد حساب کاربری خود شوید");
          queryClient.invalidateQueries({ queryKey: ["get-profile"] });
          return;
        }

        if (error?.response?.status === 422) {
          toast.error("شما نمیتوانید حساب خود را نشان کنید");
          return;
        }

        toast.error("خطایی رخ داده!");
      },
    });
  };

  return { bookmarkHandler, isBookmarking };
}

export function useGetBookmarks() {
  const { data, isLoading: isGetBookmarks } = useQuery({
    queryKey: ["get-bookmarks"],
    queryFn: getBookmarksApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: bookmarks } = data || {};

  return { bookmarks, isGetBookmarks };
}
