'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdGroup } from "react-icons/md";

export const LINKS = [
  {
    icon: MdGroup,
    href: "/groups"
  },
]

export default function SideBar() {

  const pathname = usePathname();

  return (
    <>
      <nav className="hidden min-w-[80px] min-h-full bg-violet-950 md:flex flex-col justify-center p-2 gap-y-2">
        {LINKS.map(({ icon: Icon, href }, index) => (
          <Link href={href} key={`${href}:${index}`} className={`w-full flex justify-center items-center transition-colors hover:bg-violet-900 ${pathname === href && `bg-violet-900`} rounded-xl py-4`}>
            <Icon size={32} />
          </Link>
        ))}
      </nav>
    </>
  )
}