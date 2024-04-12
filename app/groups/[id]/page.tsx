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
    <section className="w-full md:max-w-[600px] md:mx-auto animate-blurred-fade-in flex flex-col gap-y-4">
      
      <form>
    
      </form>

      <Divider />

      <GroupMessages
        apiUrl="/api/group/messages"
        socketUrl="/api/socket/group/messages"
        groupId={groupId}
        userId={userId}
      />

    </section>
  )
}