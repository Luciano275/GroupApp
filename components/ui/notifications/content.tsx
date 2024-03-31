import { tiempoTranscurrido } from "@/lib/utils";
import DeleteNotificationButton from "./delete-notification";
import { Fragment } from "react";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ApiNotificationsResponse } from "@/types";
import MoreNotifications from "./more";

export default function NotificationContent(
  { data, userId, refetch, hasNextPage, fetchNextPage, isFetchingNextPage }
  : {
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined;
    userId: string;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>
  }
) {
  return (
    data?.pages.map(({ notifications }, index) => (
      <Fragment key={`${index}:${index+1}`}>
        {
          notifications.map(({ id, group, created_at }) => (
            <div key={`${id}:${created_at}`} className="p-2 bg-violet-950 hover:bg-purple-950 rounded-xl flex flex-col">
              <p className="text-xs text-neutral-400 font-semibold">
                {tiempoTranscurrido(created_at.toString())}
              </p>
              <div className="flex items-center">
                <p className="text-sm grow pr-1 text-balance">
                  Has sido expulsado del grupo{" "}
                  <span className="font-bold">{group.title}</span>
                </p>
                
                <DeleteNotificationButton userId={userId} id={id} refetch={refetch} />
              </div>
            </div>
          ))
        }
        
        <MoreNotifications
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </Fragment>
    ))
  )
}