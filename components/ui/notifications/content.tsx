import { tiempoTranscurrido } from "@/lib/utils";
import DeleteNotificationButton from "./delete-notification";
import { Fragment } from "react";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ApiNotificationsResponse } from "@/types";
import MoreNotifications from "./more";
import AcceptRequestNotification from "./accept-request";

function NotificationText(
  { type, userEmisorName, group }
  : {
    type: 'expulsado' | 'solicitud' | 'mensaje';
    group: string;
    userEmisorName: string;
  }
) {
  
  if (type === 'expulsado') return (
    <>
      <span className="font-semibold">{userEmisorName}</span> te ha expulsado del grupo{" "}
      <span className="font-bold">{group}</span>
    </>
  )

  if (type === 'solicitud') return (
    <>
      <span className="font-semibold">{userEmisorName}</span> te ha enviado una solicitud de amistad
    </>
  )

  if (type === 'mensaje') return (
    <>
      <span className="font-semibold">{userEmisorName}</span> ha enviado un mensaje en el grupo{" "}
      <span className="font-bold">{group}</span>
    </>
  )

  return <Fragment />

}

export default function NotificationContent(
  { data, refetch, hasNextPage, fetchNextPage, isFetchingNextPage }
  : {
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined;
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
          notifications.map(({ id, group, created_at, type, userEmisor: { id: userEmisorId, name: userEmisorName } }) => (

            <div key={`${id}:${created_at}`} className="p-2 bg-violet-950 hover:bg-purple-950 rounded-xl flex flex-col">
              <p className="text-xs text-neutral-400 font-semibold">
                {tiempoTranscurrido(created_at.toString())}
              </p>

              <div className="flex items-center">
                <p className="text-sm grow pr-1 text-balance">
                  <NotificationText
                    group={group.title}
                    type={type}
                    userEmisorName={userEmisorName}
                  />
                </p>
                
                <div className="flex flex-col justify-center items-center gap-y-2">
                  { type === 'solicitud' && <AcceptRequestNotification id={id} /> }

                  <DeleteNotificationButton id={id} refetch={refetch} />
                </div>

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