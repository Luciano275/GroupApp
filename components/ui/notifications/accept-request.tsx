import { BiCheck } from "react-icons/bi";

export default function AcceptRequestNotification(
  {id}:
  {
    id: number
  }
) {
  return (
    <button className="text-neutral-300 hover:text-green-600">
      <BiCheck size={25} />
    </button>
  )
}