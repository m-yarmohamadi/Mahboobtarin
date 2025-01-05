import { followOrUnfollowApi, getFollowers, getFollowings } from "@/services/expertApi/followService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useProfile from "../useProfile";

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
  