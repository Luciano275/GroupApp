import { Suspense } from "react";
import Members from "./Members";
import { MembersSkeleton } from "@/components/skeletons/members";

export default async function MembersPage(
  { params: { id: groupId }, searchParams }
  : {
    params: {
      id: string;
    };
    searchParams?: {
      delete_member?: string;
    }
  }
) {

  const deleteMember = searchParams?.delete_member || ''

  return (
    <section className="w-full md:max-w-[600px] md:mx-auto animate-blurred-fade-in flex flex-col gap-y-4">
      <Suspense key={`${deleteMember}`} fallback={<MembersSkeleton />}>
        <Members groupId={groupId} />
      </Suspense>
    </section>
  )
}