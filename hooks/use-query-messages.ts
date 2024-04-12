import { ApiGroupMessagesResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
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
      credentials: 'include'
    });

    return rq.json() as Promise<ApiGroupMessagesResponse>
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: [`messages:${userId}`],
    initialPageParam: 1,
    queryFn: getMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: 2000
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }

}