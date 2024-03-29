import { ApiNotificationsResponse } from "@/types";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Fragment } from "react";
import NotificationCard from "./notification-card";
import MoreNotifications from "./more-notifications";

export default function NotificationContent(
  { totalNotifications, data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, userId }
  :{
    totalNotifications: number | null;
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>
    userId: string;
  }
) {
  return (
    <Fragment>
      {!totalNotifications && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center">Todavía no tienes notificaciones</p>
        </div>
      )}

      <NotificationCard
        data={data}
        refetch={refetch}
        userId={userId}
      />

      <MoreNotifications
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Fragment>
  )
}