import {
  changeStatusRequestsClientApi,
  changeStatusShopOrdersApi,
  getRequestsClientApi,
  getRequestsOrdersApi,
  getShopOrdersApi,
} from "@/services/expertApi/requestsClientService";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGetRequestsClient() {
  const { data: requestsClient, isLoading } = useQuery({
    queryKey: ["requests-client"],
    queryFn: getRequestsClientApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { requestsClient, isLoading };
}

export function useGetRequestsOrders() {
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["requests-orders"],
    queryFn: getRequestsOrdersApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { ordersData, isLoading };
}

export function useGetShopOrders() {
  const { data: shopOrders, isLoading } = useQuery({
    queryKey: ["shop-orders"],
    queryFn: getShopOrdersApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { shopOrders, isLoading };
}

export function useChangeRequestStatus() {
  const { mutate: changeStatusRequest, isPending } = useMutation({
    mutationFn: changeStatusRequestsClientApi,
    onSuccess: () => {},
    onError: (error) => {
      if (error?.response?.status === 401) {
        toast.error("ابتدا وارد حساب کاربری خود شوید");
        window.location.href = "/auth";
        return;
      }
    },
  });

  return { changeStatusRequest, isPending };
}

export function useChangeShopOrdersStatus() {
  const { mutate: changeStatusShopOrder, isPending } = useMutation({
    mutationFn: changeStatusShopOrdersApi,
    onSuccess: () => {},
    onError: (error) => {
      if (error?.response?.status === 401) {
        toast.error("ابتدا وارد حساب کاربری خود شوید");
        window.location.href = "/auth";
        return;
      }
    },
  });

  return { changeStatusShopOrder, isPending };
}
