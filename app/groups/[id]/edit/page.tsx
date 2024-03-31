import { auth } from "@/auth";
import { fetchGroupById } from "@/lib/data";
import { notFound } from 'next/navigation'
import { BiInfoCircle } from "react-icons/bi";
import EditGroupForm from "./Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar tu grupo"
}

export default async function EditGroup(
  {params}: {params: {id: string}}
) {
  const userId = (await auth())?.user?.id || '';
  const groupId = params.id;

  const group = await fetchGroupById(groupId, userId);

  if (!group) {
    notFound();
  }

  return (
    <main className="px-4 py-7">
      <div className="w-full max-w-[400px] mx-auto flex flex-col gap-y-5">
        <div className="p-4 rounded bg-yellow-300 bg-opacity-50">
          <p className="flex gap-2 items-center justify-center">
            <BiInfoCircle size={32} />
            No puedes editar el codigo del grupo.
          </p>
        </div>
        <h1 className="text-3xl border-b border-neutral-600 py-3">Editar tu grupo</h1>
        <EditGroupForm
          group={group}
        />
      </div>
    </main>
  )
}