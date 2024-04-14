import { GroupMessageType } from "@/types"
import { FaTrash } from "react-icons/fa"

export default function DeleteMessage (
  { msg, userId }
  : {
    msg: GroupMessageType;
    userId: string;
  }
) {
  return (
    (msg.status !== 'deleted' && msg.emisorUser.id === userId) && (
      <button className="absolute p-2 bg-none text-gray-500 hover:text-gray-400 top-0 rounded right-2">
        <FaTrash size={25} />
      </button>
    )
  )
}