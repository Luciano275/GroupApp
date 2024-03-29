'use client';

import { deleteGroupAction } from "@/lib/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2'
import { useLoading } from "../providers/LoadingProvider";
import Link from 'next/link'

const Actions = ({groupId}: {groupId: number}) => {

  const [pending, setPending] = useState(false);

  const { loading, setLoading } = useLoading()

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no tiene vuelta atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo",
      background: "#222",
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {

        setPending(true)
        setLoading(true)

        const results = await deleteGroupAction(groupId.toString());

        setPending(false)
        setLoading(false)
        if (results.success) {
          const params = new URLSearchParams(searchParams)

          if (params.get('delete_group')) {
            params.delete('delete_group')
          }else {
            params.set('delete_group', '1')
          }

          replace(`${pathname}?${params.toString()}`)

          return;
        }

      }
    });
  }

  return (
    <div className="flex justify-end items-center gap-3 grow">
      <Link href={`/groups/${groupId}/edit`} className="bg-indigo-600 hover:bg-indigo-400 p-2 rounded">
        <BiPencil />
      </Link>
      <button
        onClick={handleDelete}
        aria-disabled={pending}
        className={`${
          !pending
            ? "bg-red-600 hover:bg-red-400"
            : "bg-red-400 cursor-default"
        } p-2 rounded`}
      >
        <FaTrash />
      </button>
    </div>
  );
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
    <article className="bg-gradient-to-tr from-violet-700 to-fuchsia-800 hover:to-fuchsia-700 rounded p-4 w-full max-w-[420px] cursor-pointer h-[150px] flex flex-col">
      <h2
        onClick={handleClick}
        className="text-2xl py-2 w-full max-w-[30ch] overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
      >
        <span title={title}>{title}</span>
      </h2>

      <p className="w-fit text-neutral-300">
        <span>{userId === ownerId ? "Tú" : owner}</span>
      </p>

      {userId === ownerId && <Actions groupId={id} />}
    </article>
  );
}