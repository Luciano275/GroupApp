'use client';

import { useRouter } from "next/navigation";
import { BiPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

const Actions = () => {
  return (
    <div className="flex justify-end items-center gap-3 grow">
      <button className="bg-indigo-600 hover:bg-indigo-400 p-2 rounded">
        <BiPencil />
      </button>
      <button className="bg-red-600 hover:bg-red-400 p-2 rounded">
        <FaTrash />
      </button>
    </div>
  )
}

export default function GroupCard (
  { title, id, teacher: { name: owner, id: ownerId }, userId }:
  {
    id: number;
    title: string;
    teacher: {
      name: string | null;
      id: string | null;
    }
    userId: string;
  }
) {

  const { push } = useRouter()

  const handleClick = () => push(`/groups/${id}`)

  return (
    <article className="bg-gradient-to-tr from-violet-700 to-fuchsia-800 hover:to-fuchsia-700 rounded p-4 w-full max-w-[420px] cursor-pointer h-[150px] flex flex-col" onClick={handleClick}>
      <h2 className="text-2xl py-2 w-full max-w-[30ch] overflow-hidden whitespace-nowrap text-ellipsis">
        <span title={title}>{title}</span>
      </h2>
      
      <p className="w-fit text-neutral-300">
        <span>{userId === ownerId ? 'Tú' : owner}</span>
      </p>

      {
        userId === ownerId && (
          <Actions />
        )
      }
    </article>
  )
}