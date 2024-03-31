import { ApiNotificationsResponse } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import qs from 'query-string'

export const useQueryNotifications = ({userId, apiUrl}: {userId: string, apiUrl: string}) => {

  const getNotifications = async ({pageParam = undefined}: {pageParam?: number}) => {
    
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        user_id: userId
      }
    })

    const rq = await fetch(url, {
      credentials: 'include',
    })

    return rq.json() as Promise<ApiNotificationsResponse>;

  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: [`notifications:${userId}`],
    initialPageParam: 1,
    queryFn: getNotifications,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: 5000
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