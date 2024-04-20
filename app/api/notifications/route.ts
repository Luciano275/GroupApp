import { auth } from "@/auth";
import { db } from "@/lib/db";

const TOTAL_NOTIFICATIONS = 5;

export const runtime = 'edge';

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
          created_at: true,
          type: true,
          userEmisor: {
            select: {
              id: true,
              name: true
            }
          }
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
          created_at: true,
          type: true,
          userEmisor: {
            select: {
              id: true,
              name: true
            }
          }
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

export async function DELETE(req: Request) {
  try {
    const userId = (await auth())?.user?.id || '';

    const searchParams = new URL(req.url).searchParams;
    const notificationId = searchParams.get('notification_id') || '';

    if (!notificationId) {
      return Response.json({
        message: 'No group id provided'
      }, {
        status: 400
      })
    }

    const notification = await db.notification.findFirst({
      where: {
        AND: [
          {
            id: Number(notificationId)
          },
          {
            userId
          }
        ]
      }
    })

    if (!notification) {
      return Response.json({
        message: 'Notification not found'
      }, {
        status: 404
      })
    }

    await db.notification.delete({
      where: {
        id: Number(notificationId)
      }
    })

    return Response.json({
      message: 'Notification deleted!'
    })
  }catch (e) {
    console.error(e);
    return Response.json({
      message: 'Failed to delete notification'
    }, {
      status: 500
    })
  }
}