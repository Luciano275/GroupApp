import AddMessage from "./add-message";
import { Divider } from "./divider";
import GroupMessages from "./Messages";
import { auth } from "@/auth";

export default async function Group(
  {params: { id: groupId }}
  : {
    params: {
      id: string
    }
  }
) {

  const userId = (await auth())?.user?.id!

  return (
    <section className="grow w-full md:max-w-[600px] md:mx-auto animate-blurred-fade-in flex flex-col gap-y-4">

      <AddMessage
        userId={userId}
        apiUrl={'/api/socket/group/messages'}
        groupId={groupId}
      />

      <Divider />

      <GroupMessages
        apiUrl="/api/group/messages"
        groupId={groupId}
        userId={userId}
      />

    </section>
  )
}