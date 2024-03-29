'use client'

import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { Fragment, useState } from 'react'
import { BiTrash } from "react-icons/bi";
import { useQueryNotifications } from "@/hooks/use-query-notifications";
import Spinner from "@/components/Spinner";
import { tiempoTranscurrido } from "@/lib/utils";

export default function ModalNotifications (
  { userId }: {
    userId: string
  }
) {

  const [show, setShow] = useState(false);

  const onCloseShow = () => setShow(!show);

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } = useQueryNotifications({userId, apiUrl: '/api/notifications'})

  return (
    <>
      <button
        className="outline-none relative p-2 bg-gray-900 rounded hover:bg-gray-800"
        onClick={onCloseShow}
      >
        {!show ? (
          <IoMdNotificationsOutline size={35} />
        ) : (
          <IoMdNotifications size={35} />
        )}
        {(status === 'success' && data?.pages && data.pages.length > 0 && data.pages[0].notifications.length > 0) && (
          <span className="bg-red-600 w-5 h-5 rounded-full border-2 border-white absolute top-1 right-1 text-xs font-bold z-10"></span>
        )}
      </button>
      <div
        className={`absolute ${
          show ? "right-4" : "-right-[400px]"
        } top-28 min-w-[340px] min-h-[300px] max-w-[340px] max-h-[300px] overflow-x-hidden overflow-y-auto bg-gray-900 transition-all rounded-xl p-2 flex flex-col gap-y-4`}
      >
        {status === "pending" ? (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <p className="text-red-600">Error al cargar notificaciones</p>
          </div>
        ) : (
          <>
            {data?.pages.map(({ notifications }, index) => (
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
            ))}

            {hasNextPage &&
              (isFetchingNextPage ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <button
                  className="w-fit mx-auto text-center bg-gray-800 p-2 rounded hover:bg-gray-700"
                  onClick={() => fetchNextPage()}
                >
                  Mostrar más
                </button>
              ))}
          </>
        )}
      </div>
    </>
  );
}