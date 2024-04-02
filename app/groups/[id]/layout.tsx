import { auth } from "@/auth";
import { belongGroup } from "@/lib/data";
import { notFound } from "next/navigation";
import GroupLinks from "./group-links";

export default async function GroupLayout(
  {children, params: { id: groupId }}:
  {
    children: React.ReactNode;
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

  const isOwner = group.userId === userId;

  return (
    <main className="p-4 overflow-x-hidden overflow-y-auto grow">
      <header className="py-5">
        <h1 className="text-3xl text-center">{group.title}</h1>
        <h3 className="text-center text-neutral-400 py-2">
          Creado por <span className="font-bold">{group.teacher.name}</span>
        </h3>
      </header>
      <GroupLinks groupId={groupId} isOwner={isOwner} />

      <div className="w-full md:max-w-[600px] mx-auto border-t border-neutral-700 mt-5 py-5">
        {children}
      </div>
    </main>
  );
}