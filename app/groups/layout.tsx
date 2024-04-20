import { auth } from "@/auth";
import MobileNav from "@/components/ui/navs/MobileNav";
import Nav from "@/components/ui/navs/Nav"
import SideBar from "@/components/ui/navs/Sidebar"
import { Metadata } from "next"

export const runtime = 'edge';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth();

  return {
    title: {
      template: `${session?.user?.name} - %s`,
      default: session?.user?.name!
    }
  }
}

export default function GroupLayout (
  {children}
  :{
    children: React.ReactNode
  }
) {
  return (
    <div className="flex flex-col md:flex-row animate-fade-in min-h-dvh max-h-dvh">
      <SideBar />
      <div className="grow min-h-dvh overflow-y-hidden overflow-x-hidden flex flex-col">
        <Nav />
        {children}
        <MobileNav />
      </div>
    </div>
  )
}