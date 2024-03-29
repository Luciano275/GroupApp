import { auth } from "@/auth";
import ModalNotifications from "./Modal";
import { fetchMyNotifications } from "@/lib/data";

export default async function Notifications () {

  const userId = (await auth())?.user?.id;

  return (
    <div className="flex flex-col items-end gap-y-4 transition-all">
      <ModalNotifications userId={userId || ''} />
    </div>
  )
}