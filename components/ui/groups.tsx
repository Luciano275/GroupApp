import { fetchMyGroups } from "@/lib/data"
import GroupCard from "./group-card"

export default async function MyGroups ({userId}: {userId: string}) {

  const groups = await fetchMyGroups(userId)

  return (
    <section className="flex items-center gap-5 flex-wrap">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          title={group.title}
          id={group.id}
          teacher={group.teacher}
          userId={userId}
        />
      ))}
    </section>
  )
}