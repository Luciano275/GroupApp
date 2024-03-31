import { auth } from "@/auth"
import { GroupSkeleton } from "@/components/skeletons/groups";
import MyGroups from "@/components/ui/groups";
import GroupButtons from "@/components/ui/groups-buttons";
import { Suspense } from "react";

export default async function Groups ({
  searchParams
}: {
  searchParams?: {
    new_group?: string;
    delete_group?: string;
  }
}) {

  const session = await auth()
  const newGroup = searchParams?.new_group || ''
  const deleteGroup = searchParams?.delete_group || ''

  return (
    <main className="p-8 min-h-dvh max-h-dvh overflow-x-hidden overflow-y-auto">
      <div className="py-5 mb-5 flex flex-col gap-y-6">
        <GroupButtons />
      </div>
      
      <Suspense key={`${newGroup}:${deleteGroup}`} fallback={<GroupSkeleton />}>
        <MyGroups userId={session?.user?.id || ""} />
      </Suspense>
    </main>
  )
}