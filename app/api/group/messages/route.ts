import { auth } from "@/auth";
import { belongGroup } from "@/lib/data";
import { db } from "@/lib/db";
import { ApiGroupMessagesResponse } from "@/types";

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

    let allMessages: ApiGroupMessagesResponse['messages'] = []

    if (cursor && Number(cursor)-1 > 0) {
      allMessages = await db.groupMessage.findMany({
        select: {
          id: true,
          created_at: true,
          emisorUser: {
            select: {
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
          emisorUser: {
            select: {
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

    const nextCursor = allMessages.length === TOTAL_MESSAGES ? allMessages[allMessages.length-1] : null

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