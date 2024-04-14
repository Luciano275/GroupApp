import { useSocket } from "@/components/providers/SocketProvider";
import { ApiGroupMessagesResponse } from "@/types";
import { useInfiniteQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
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
      credentials: 'include',
      next: {
        tags: ['group:messages']
      }
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
    isLoading,
    error,
    isPending,
    fetchStatus
  } = useSuspenseInfiniteQuery({
    queryKey: [`messages:${userId}`],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: 1000
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isLoading,
    error,
    isPending,
    fetchStatus
  }

}