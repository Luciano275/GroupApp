import { auth } from "@/auth";
import { belongGroup, fetchMembersByGroup } from "@/lib/data";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { PostGroupMessage } from "@/schemas/group-message";
import { GroupMessageType } from "@/types";

const TOTAL_MESSAGES = 20

export const GET = async (req: Request) => {
  try {

    const searchParams = new URL(req.url).searchParams;
    const cursor = searchParams.get('cursor');
    const groupId = searchParams.get('groupId');
    const userId = (await auth())?.user?.id

    if (!groupId) return Response.json({message: 'Group ID es requerido'}, { status: 400 })

    const belong = await belongGroup(groupId, userId!);

    if (!belong) {
      return Response.json({message: 'No tienes permitido realizar esta acción'}, { status: 403 })
    }

    let allMessages: GroupMessageType[] = []

    if (cursor && isNaN(Number(cursor))) {
      allMessages = await db.groupMessage.findMany({
        select: {
          id: true,
          created_at: true,
          status: true,
          emisorUser: {
            select: {
              name: true,
              email: true,
              image: true,
              id: true,
            }
          },
          group: {
            select: {
              id: true,
              title: true
            }
          },
          message: true
        },
        where: {
          group_id: belong.id
        },
        orderBy: {
          created_at: 'desc'
        },
        take: TOTAL_MESSAGES,
        skip: 1,
        cursor: {
          id: cursor
        }
      })
    }else {
      allMessages = await db.groupMessage.findMany({
        select: {
          id: true,
          created_at: true,
          status: true,
          emisorUser: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          },
          group: {
            select: {
              id: true,
              title: true
            }
          },
          message: true
        },
        where: {
          group_id: belong.id
        },
        orderBy: {
          created_at: 'desc'
        },
        take: TOTAL_MESSAGES
      })
    }

    const nextCursor = allMessages.length === TOTAL_MESSAGES ? allMessages[allMessages.length-1].id : null

    return Response.json({
      messages: allMessages,
      nextCursor
    })

  }catch(e) {
    console.error(e);
    return Response.json({
      message: 'Server error'
    }, {
      status: 500
    })
  }
}

export const POST = async (req: Request) => {
  try {

    const parsedData = PostGroupMessage.safeParse(await req.json());
    const searchParams = new URL(req.url).searchParams
    const groupId = searchParams.get('groupId');
    const userId = searchParams.get('userId');

    if (!parsedData.success) {
      return Response.json({
        errors: parsedData.error.flatten().fieldErrors,
        message: 'Completa los campos para enviar el mensaje',
        success: false
      }, {
        status: 400
      })
    }

    if (!groupId) {
      return Response.json({ message: 'Group ID es requerido' }, {status: 400})
    }

    if (!userId) {
      return Response.json({ message: 'User ID es requerido' }, {status: 400})
    }

    const belong = await belongGroup(groupId as string, userId as string);

    if (!belong) {
      return Response.json({ message: 'No tienes permitido realizar esta acción' }, {status: 403})
    }

    const { message } = parsedData.data
    const { id } = belong;

    const isOwner = belong.userId === userId
    const newMessage = await db.groupMessage.create({
      data: {
        emisor: userId.toString(),
        group_id: id,
        message
      },
      select: {
        group: {
          select: {
            id: true,
            title: true
          }
        },
        id: true,
        message: true,
        created_at: true,
        status: true,
        emisorUser: {
          select: {
            name: true,
            email: true,
            image: true,
            id: true
          }
        }
      }
    })

    if (isOwner) {
      
      const members = await fetchMembersByGroup(id.toString());

      if (members) {
        members.forEach(async ({ user: { id: userId } }) => {
          await db.notification.create({
            data: {
              groupId: id,
              userId,
              emisor: belong.userId,
              type: 'mensaje'
            }
          })
        })
      }

    }

    await pusherServer.trigger(
      id.toString(),
      'chat:messages',
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