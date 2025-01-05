import {
  getDashboardInfo,
  getPlans,
  likeOrDislikeApi,
} from "@/services/expertDashboardService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
