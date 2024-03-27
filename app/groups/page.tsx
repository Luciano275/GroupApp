import { auth } from "@/auth"
import MyGroups from "@/components/ui/groups";
import GroupButtons from "@/components/ui/groups-buttons";
import Logout from "@/components/ui/logout";
import { Suspense } from "react";

export default async function Groups () {

  const session = await auth()

  return (
    <main className="p-4">
      <header className="flex justify-center items-center gap-y-5 flex-col mb-5 py-5">
        <img src={session?.user?.image || undefined} alt={'User logo'} className="rounded-full w-[100px] h-[100px]" />
        <h2 className="text-3xl">{session?.user?.name}</h2>
        
        <Logout />
      </header>
      <div className="border-b border-neutral-700 pt-2 pb-7 mb-5 flex flex-col gap-y-6">
        <h2 className="text-center text-4xl">Tus grupos</h2>
        <GroupButtons />
      </div>
      
      <Suspense fallback={<p>Loading...</p>}>
        <MyGroups userId={session?.user?.id || ""} />
      </Suspense>
    </main>
  )
}