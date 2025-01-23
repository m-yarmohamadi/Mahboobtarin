import {
  getRequestsList,
  registerListRequestApi,
  registerRequestApi,
} from "@/services/expertApi/callingService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

export function useRegisterRequest() {
  const router = useRouter();
  const { mutate: mutateRegisterReqeust, isPending } = useMutation({
    mutationFn: registerRequestApi,
    onSuccess: (res) => {
      toast.success(res?.message[0]);
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        toast.error("ابتدا وارد حساب کاربری خود شوید");
        router.push("/auth");
        return;
      }
    },
  });

  return { mutateRegisterReqeust, isPending };
}
