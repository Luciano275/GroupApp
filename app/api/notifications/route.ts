import { db } from "@/lib/db";

const TOTAL_NOTIFICATIONS = 5;

export async function GET(req: Request) {
  try {

    const searchParams = new URL(req.url).searchParams;
    const cursor = searchParams.get('cursor')
    const userId = searchParams.get('user_id') || ''

    let notifications;

    if (cursor && Number(cursor)-1 > 0) {
      notifications = await db.notification.findMany({
        where: {
          userId
        },
        select: {
          id: true,
          group: {
            select: {
              id: true,
              title: true
            }
          },
          created_at: true
        },
        take: TOTAL_NOTIFICATIONS,
        skip: 1,
        cursor: {
          id: Number(cursor)
        }
      })
    }else {
      notifications = await db.notification.findMany({
        where: {
          userId
        },
        select: {
          id: true,
          group: {
            select: {
              id: true,
              title: true
            }
          },
          created_at: true
        },
        take: TOTAL_NOTIFICATIONS
      })
    }

    const nextCursor = notifications.length === TOTAL_NOTIFICATIONS
      ? notifications[notifications.length - 1].id : null;

    return Response.json({
      notifications,
      nextCursor
    })

  }catch (e) {
    console.error(e);
    return Response.json({
      message: 'Failed to fetch notifications'
    }, {
      status: 500
    })
  }
}