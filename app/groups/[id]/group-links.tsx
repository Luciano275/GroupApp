'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const generateLinks = (groupId: string) => ([
  {
    href: `/groups/${groupId}`,
    label: 'Mensajes'
  },
  {
    href: `/groups/${groupId}/members`,
    label: 'Miembros'
  }
])

export default function GroupLinks (
  {groupId}
  : {
    groupId: string;
  }
) {

  const pathname = usePathname();

  const LINKS = generateLinks(groupId)
  
  return (
    <div className="flex justify-center items-center gap-4 mt-5">
      {
        LINKS.map(({ href, label }) => (
          <Link
            key={`${href}:${label}`}
            className={`w-full max-w-[250px] py-2 px-4 rounded text-xl text-center hover:bg-violet-900 ${pathname === href ? 'bg-violet-900' : 'bg-purple-950'}`}
            href={href}
          >
            {label}
          </Link>
        ))
      }
    </div>
  )
}