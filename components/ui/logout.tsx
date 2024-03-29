'use client'

import { logoutAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { BiLogOut } from "react-icons/bi";

function LogoutButton() {

  const { pending } = useFormStatus()

  return (
    <button className={`flex gap-x-2 bg-red-600 ${pending && 'bg-opacity-20'} rounded w-fit px-4 py-1 justify-center items-center text-xl hover:bg-red-400`} aria-disabled={pending}>
      <BiLogOut />
      Salir
    </button>
  )
}

export default function Logout() {

  const [state, dispatch] = useFormState(logoutAction, undefined)

  return (
    <form action={dispatch} className="self-center">
      <LogoutButton />
    </form>
  )
}