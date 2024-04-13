import { useSocket } from "@/components/providers/SocketProvider";
import { ApiGroupMessagesResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from 'query-string'

export const useQueryGroupMessages = ({userId, groupId, apiUrl}: { userId: string, groupId: string, apiUrl: string }) => {

  const { socket } = useSocket();

  const getMessages = async ({pageParam = undefined}: {pageParam?: number}) => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        groupId,
        cursor: pageParam
      }
    })

    const rq = await fetch(url, {
      credentials: 'include'
    });

    return await rq.json() as ApiGroupMessagesResponse
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isLoading
  } = useInfiniteQuery({
    queryKey: [`messages:${userId}`],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: !socket ? 2000 : false
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isLoading
  }

}