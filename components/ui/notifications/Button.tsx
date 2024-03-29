import { ApiNotificationsResponse } from "@/types";
import { InfiniteData } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";

export default function NotificationButton (
  {show, setShow, status, data, totalNofitications}:
  {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    status: "success" | "error" | "pending";
    data: InfiniteData<ApiNotificationsResponse, unknown> | undefined;
    totalNofitications: number | null;
  }
) {

  const onCloseShow = () => setShow(!show);

  return (
    <button
      className="absolute outline-none top-5 right-4 p-2 bg-gray-900 rounded hover:bg-gray-800"
      onClick={onCloseShow}
    >
      {!show ? (
        <IoMdNotificationsOutline size={35} />
      ) : (
        <IoMdNotifications size={35} />
      )}
      {(status === 'success' && totalNofitications && Number(totalNofitications) > 0) && (
        <span className="bg-red-600 w-5 h-5 rounded-full border-2 border-white absolute top-1 right-1 text-xs font-bold z-10">
          {totalNofitications}
        </span>
      )}
    </button>
  )
}