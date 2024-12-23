import { getUserFavorites } from "@/services/authService";
import {
  bookmarkApi,
  followOrUnfollowApi,
  getAllCommentsDashboard,
  getAllServices,
  getBookmarksApi,
  getCommentExpertise,
  getDashboardInfo,
  getFollowers,
  getFollowings,
  getPlans,
  getPopularFavorites,
  getRequestsList,
  getServiceById,
  getServiceItems,
  getServiceProfile,
  getTicket,
  likeOrDislikeApi,
} from "@/services/expertDashboardService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useProfile from "./useProfile";
import { usePathname, useRouter } from "next/navigation";

// * expert dashboard info --------------
export function useDashboardInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-dashboard-info"],
    queryFn: getDashboardInfo,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: infoData } = data || {};

  return { infoData, isLoading };
}

// * expert services --------------
export function useGetServices() {
  const { data, isLoading: isLoadingServices } = useQuery({
    queryKey: ["get-services"],
    queryFn: getAllServices,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: servicesData } = data || {};

  return { servicesData, isLoadingServices };
}

export function useGetServiceById(serviceId) {
  const { data, isLoading: isLoadingService } = useQuery({
    queryKey: ["get-service-by-id", serviceId],
    queryFn: () => getServiceById(serviceId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: serviceData } = data || {};

  return { serviceData, isLoadingService };
}

export function useGetServicesProfile(expertId, serviceId) {
  const { data, isLoading: isLoadingServices } = useQuery({
    queryKey: ["get-services-profile"],
    queryFn: () => getServiceProfile(expertId, serviceId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: servicesData } = data || {};

  return { servicesData, isLoadingServices };
}

export function useGetServiceItems() {
  const { data, isLoading: isLoadServiceItems } = useQuery({
    queryKey: ["get-service-items"],
    queryFn: getServiceItems,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: list } = data || {};
  const serviceItems =
    !isLoadServiceItems &&
    list.map((item) => {
      return {
        value: item.title,
        label: item.title,
        type: item.type,
        id: item.id,
      };
    });

  return { serviceItems, isLoadServiceItems };
}

// * expert favorites --------------
export function usePopularFavorites() {
  const { data, isLoading: isGetPopular } = useQuery({
    queryKey: ["get-popular-favorites"],
    queryFn: getPopularFavorites,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: list } = data || {};

  const popularList =
    !isGetPopular &&
    list.map((item) => {
      return { value: item.id, label: item.name };
    });

  return { list, popularList, isGetPopular };
}

export function useGetFavorites() {
  const { data, isLoading: isGetFavorites } = useQuery({
    queryKey: ["get-user-favorites"],
    queryFn: getUserFavorites,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: favorites } = data || {};

  return { favorites, isGetFavorites };
}

// * expert follow --------------
export function useFollow() {
  const { mutate, isPending: isFollowing } = useMutation({
    mutationFn: followOrUnfollowApi,
  });
  const queryClient = useQueryClient();
  const { user } = useProfile();

  const followHandler = (id, userName) => {
    if (user) {
      if (Number(user.id) === Number(id)) {
        toast.error("شما نمیتوانید خودتان را دنبال کنید");
        return;
      }
    }

    mutate(id, {
      onSuccess: ({ data }) => {
        if (data.message[0] === "Unfollow succesfully!") {
          toast.success(`${userName} از دنبال شوندگان حذف شد`);
          queryClient.invalidateQueries({ queryKey: ["get-followings"] });
          queryClient.invalidateQueries({ queryKey: ["get-followers"] });
          queryClient.invalidateQueries({
            queryKey: ["get-expertise-user-by-id"],
          });
        }

        if (data.message[0] === "Follow Succesfully!") {
          toast.success(`${userName} دنبال شد`);
          queryClient.invalidateQueries({ queryKey: ["get-followings"] });
          queryClient.invalidateQueries({ queryKey: ["get-followers"] });
          queryClient.invalidateQueries({
            queryKey: ["get-expertise-user-by-id"],
          });
        }
      },
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast.error("ابتدا وارد حساب کاربری خود شوید");
          queryClient.invalidateQueries({ queryKey: ["get-profile"] });
          return;
        }

        toast.error("خطایی رخ داده!");
      },
    });
  };

  return { followHandler, isFollowing };
}

export function useGetFollowings(expertiseId) {
  const { data, isLoading: isGetFollowings } = useQuery({
    queryKey: ["get-followings", expertiseId],
    queryFn: () => getFollowings(expertiseId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: followings } = data || {};

  return { followings, isGetFollowings };
}

export function useGetFollowers(expertiseId) {
  const { data, isLoading: isGetFollowers } = useQuery({
    queryKey: ["get-followers", expertiseId],
    queryFn: () => getFollowers(expertiseId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: followers } = data || {};

  return { followers, isGetFollowers };
}

// * expert like --------------
export function useLikeOrDislike() {
  const { mutate, isPending: isLiking } = useMutation({
    mutationFn: likeOrDislikeApi,
  });
  const queryClient = useQueryClient();

  const likeDislikeHandler = (id) => {
    mutate(id, {
      onSuccess: ({ data }) => {
        if (data.message[0] === "Favorit Succesfully!") {
          toast.success("متخصص لایک شد");
        } else {
          toast.success("لایک متخصص برداشته شد");
        }
        queryClient.invalidateQueries({
          queryKey: ["get-expertise-user-by-id"],
        });
      },
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast.error("ابتدا وارد حساب کاربری خود شوید");
          queryClient.invalidateQueries({ queryKey: ["get-profile"] });
          return;
        }

        toast.error("خطایی رخ داده!");
      },
    });
  };

  return { likeDislikeHandler, isLiking };
}

// * expert requests (calling page) --------------
export function useGetRequests() {
  const { data: requestsData, isLoading: isGetRequests } = useQuery({
    queryKey: ["get-requests"],
    queryFn: getRequestsList,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: requests } = requestsData || {};

  return { requests, isGetRequests };
}

// * expert support --------------
export function useGetTicket(ticketId) {
  const { data: ticketData, isLoading } = useQuery({
    queryKey: ["get-tickets", ticketId],
    queryFn: () => getTicket(ticketId),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: tickets } = ticketData || {};

  return { tickets, isLoading };
}

// * expert plans --------------
export function useGetPlans() {
  const { data: plansData, isLoading } = useQuery({
    queryKey: ["get-tickets"],
    queryFn: () => getPlans(),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: plans } = plansData || {};

  return { plans, isLoading };
}

// * expert comments --------------
export function useGetAllComments() {
  const { data: commentsData, isLoading } = useQuery({
    queryKey: ["get-comments-dashboard"],
    queryFn: getAllCommentsDashboard,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: comments } = commentsData || {};

  return { comments, isLoading };
}

// * expert like --------------
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
