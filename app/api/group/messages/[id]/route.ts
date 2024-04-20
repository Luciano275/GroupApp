import { auth } from "@/auth";
import { belongGroup, fetchGroupById } from "@/lib/data";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { GroupMessageType } from "@/types";

export const DELETE = async (req: Request, {params}: { params: { id: string } }) => {
  try {

    const searchParams = new URL(req.url).searchParams;

    const {id} = params;
    const groupId = searchParams.get('groupId');
    const userId = (await auth())?.user?.id!;

    if (!groupId) {
      return Response.json({ message: 'Group Id es requerido' }, {status: 400})
    }

    if (!userId) {
      return Response.json({ message: 'User ID es requerido' }, {status: 400})
    }

    const isGroupExists = await belongGroup(groupId, userId);

    if (!isGroupExists) {
      return Response.json({message: 'El group no existe'}, {status: 404})
    }

    const isMessageExists = await db.groupMessage.findFirst({
      where: {
        AND: [
          {
            id
          },
          {
            emisor: userId
          }
        ]
      }
    })

    if (!isMessageExists) {
      return Response.json({message: 'El mensaje no existe'}, {status: 404})
    }

    const newMessage: GroupMessageType | null = await db.groupMessage.update({
      where: {
        id
      },
      data: {
        status: 'deleted',
        message: 'Mensaje borrado'
      },
      select: {
        group: {
          select: {
            id: true,
            title: true
          }
        },
        message: true,
        created_at: true,
        status: true,
        id: true,
        emisorUser: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true
          }
        }
      }
    })

    await pusherServer.trigger(
      groupId,
      'chat:messages:updated',
      {
        ...newMessage
      }
    )

    return Response.json({newMessage})

  }catch (e) {
    console.error(e);
    return Response.json({message: 'Server error'}, {status: 500})
  }
}