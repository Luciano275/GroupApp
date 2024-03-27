import { fetchMyGroups } from "@/lib/data"

export default async function MyGroups ({userId}: {userId: string}) {

  const groups = await fetchMyGroups(userId)

  return (
    <section className="flex justify-center items-center gap-5 flex-wrap">
      {JSON.stringify(groups)}
    </section>
  )
}