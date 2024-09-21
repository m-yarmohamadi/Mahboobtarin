import { getUserFavorites } from "@/services/authService";
import {
  followOrUnfollowApi,
  getAllServices,
  getCommentExpertise,
  getFollowings,
  getPopularFavorites,
  getServiceById,
  likeOrDislikeApi,
} from "@/services/expertDashboardService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useProfile from "./useProfile";

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
          queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });
        }

        if (data.message[0] === "Follow Succesfully!") {
          toast.success(`${userName} دنبال شد`);
          queryClient.invalidateQueries({ queryKey: ["get-followings"] });
          queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });
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

export function useGetFollowings() {
  const { data, isLoading: isGetFollowings } = useQuery({
    queryKey: ["get-followings"],
    queryFn: getFollowings,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { data: followings } = data || {};

  return { followings, isGetFollowings };
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
        queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });

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
