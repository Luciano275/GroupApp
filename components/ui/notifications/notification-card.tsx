import { tiempoTranscurrido } from "@/lib/utils"
import { ApiNotificationsResponse } from "@/types"
import { InfiniteData, QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { Fragment } from "react"
import DeleteNotificationButton from "./delete-notification"

export default function NotificationCard(
  {data, refetch, userId}:
  {
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>
    userId: string;
  }
) {
  return (
    data?.pages.map(({ notifications }, index) => (
      <Fragment key={`${index}:${index + 1}`}>
        {notifications.map(({ id, group, created_at }, index) => (
          <div
            key={`${index}:${id}`}
            className="p-2 bg-gray-800 rounded-xl flex flex-col"
          >
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
        ))}
      </Fragment>
    ))
  )
}