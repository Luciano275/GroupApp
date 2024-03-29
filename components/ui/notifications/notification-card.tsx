import { tiempoTranscurrido } from "@/lib/utils"
import { ApiNotificationsResponse } from "@/types"
import { InfiniteData } from "@tanstack/react-query"
import { BiTrash } from "react-icons/bi"
import { Fragment } from "react"

export default function NotificationCard(
  {data}:
  {
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined
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
              <button
                className="text-neutral-300 hover:text-red-500 cursor-pointer"
                title="Borrar notificación"
              >
                <BiTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </Fragment>
    ))
  )
}