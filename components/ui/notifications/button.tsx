import { Dispatch, SetStateAction } from "react";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";

export default function NotificationButton (
  {show, status, totalNotifications, setShow}
  : {
    show: boolean;
    status: 'success' | 'pending' | 'error';
    totalNotifications: number | null;
    setShow: Dispatch<SetStateAction<boolean>>
  }
) {
  return (
    <button className="p-2 bg-none outline-none relative" onClick={() => setShow(!show)}>
      {
        show ? <IoMdNotifications size={35} />
        : <IoMdNotificationsOutline size={35} />
      }
      {(status === 'success' && totalNotifications && Number(totalNotifications) > 0) && (
        <span className="bg-red-600 w-5 h-5 rounded-full border-2 border-white absolute top-1 right-1 text-xs font-bold z-10">
          {totalNotifications}
        </span>
      )}
    </button>
  )
}