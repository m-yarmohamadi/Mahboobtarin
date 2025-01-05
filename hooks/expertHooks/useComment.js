import { getAllCommentsDashboard } from "@/services/expertApi/commentService";
import { useQuery } from "@tanstack/react-query";

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
  