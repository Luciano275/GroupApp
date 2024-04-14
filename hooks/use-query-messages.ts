import { pusherClient } from "@/lib/pusher";
import { ApiGroupMessagesResponse } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from 'query-string'

export const useQueryGroupMessages = ({userId, groupId, apiUrl}: { userId: string, groupId: string, apiUrl: string }) => {

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
  } = useInfiniteQuery({
    queryKey: [`messages:${groupId}:${userId}`],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: pusherClient ? false : 2000
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