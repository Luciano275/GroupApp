'use client'

import { LINKS } from './Sidebar'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {

  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center md:hidden p-2 gap-2 bg-violet-950">
      {
        LINKS.map(({ icon: Icon, href }, index) => (
          <Link 
            href={href} key={`${index}:${href}:${index+1}`}
            className={`flex justify-center items-center rounded grow hover:bg-violet-900 ${pathname === href && `bg-violet-900`}`}
          >
            <Icon size={32} />
          </Link>
        ))
      }
    </nav>
  )
}