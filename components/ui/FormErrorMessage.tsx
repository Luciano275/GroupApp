import { ResponseGroupAction } from "@/types";
import { CiCircleCheck, CiWarning } from "react-icons/ci"

export default function FormErrorMessage(
  {state}
  :{
    state: ResponseGroupAction;
  }
) {
  return (
    state.message && (
      <p
        className={`${
          state.success ? "bg-green-500" : "bg-red-500"
        } bg-opacity-30 rounded items-center justify-center p-3 flex gap-x-3`}
      >
        {state.success ? (
          <CiCircleCheck size={30} />
        ) : (
          <CiWarning size={25} />
        )}
        {state.message}
      </p>
    )
  )
}