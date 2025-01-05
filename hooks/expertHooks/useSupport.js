import { getTicket } from "@/services/expertApi/supportService";
import { useQuery } from "@tanstack/react-query";

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
  