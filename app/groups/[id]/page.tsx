import { auth } from "@/auth";
import { belongGroup } from "@/lib/data"
import { notFound } from "next/navigation";

export default async function Group(
  { params: {id: groupId} }
  :{
    params: {
      id: string
    }
  }
) {

  const userId = (await auth())?.user?.id

  const group = await belongGroup(groupId, userId!);

  if (!group) {
    notFound();
  }

  return (
    <main className="p-4">
      <h1>{group.title}</h1>
      <p>{group.code}</p>
    </main>
  )
}