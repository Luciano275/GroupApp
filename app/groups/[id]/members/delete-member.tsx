import { FaUserMinus } from "react-icons/fa";

export default function DeleteMember() {
  return (
    <div className="flex items-center justify-center">
      <button className="bg-neutral-800 p-2 rounded text-red-500 hover:bg-neutral-900">
        <FaUserMinus size={25} />
      </button>
    </div>
  )
}