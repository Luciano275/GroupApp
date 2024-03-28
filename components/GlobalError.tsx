'use client'

import { CiWarning } from "react-icons/ci"
import { useGlobalError } from "./providers/GlobalErrorProvider"
import { CgClose } from "react-icons/cg"

export default function GlobalError () {

  const { error, setError } = useGlobalError()

  if (error) {
    return (
      <div className="flex justify-center items-center py-4 px-2">
        <p className="w-fit max-w-[450px] font-semibold bg-red-600 bg-opacity-40 py-4 pl-4 pr-9 rounded text-center flex gap-x-2 items-center relative">
          <CiWarning size={30} />
          {error}
          <span
            className="absolute right-2 text-xl text-neutral-300 hover:text-white cursor-pointer"
            onClick={() => setError(null)}
          >
            <CgClose />
          </span>
        </p>
      </div>
    );
  }
}