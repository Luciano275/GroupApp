import { Prisma } from "@prisma/client";
import { db } from "./db";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function fetchMyGroups(id: string) {
  try {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const groups = await db.group.findMany({
      where: {
        OR: [
          {
            members: {
              some: {
                userId: id,
              },
            },
          },
          {
            userId: id,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        code: true,
        teacher: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return groups
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch groups")
  }
}

export async function createGroup({
  title,
  code,
  userId
}: {
  title: string;
  code: string;
  userId: string;
}) {
  try {
    const data = await db.group.create({
      data: {
        title,
        code,
        userId
      }
    })

    return data
  }catch (e) {
    console.error(e);
    throw new Error("Failed to create group")
  }
}

export async function fetchGroupByCode(code: string) {
  try {
    const group = await db.group.findFirst({
      where: {
        code
      }
    })

    return group;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch group by code")
  }
}

export async function belongGroup(groupId: string, userId: string) {
  try {
    const group = await db.group.findFirst({
      where: {
        AND: [
          {
            id: Number(groupId) || -1
          },
          {
            OR: [
              {
                members: {
                  some: {
                    userId
                  }
                }
              },
              {
                userId
              }
            ]
          }
        ]
      }
    })

    return group;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch group by id")
  }
}

export async function fetchGroupById(groupId: string, userId: string) {
  try {
    const group = await db.group.findFirst({
      where: {
        AND: [
          {
            id: Number(groupId) || -1
          },
          {
            userId
          }
        ]
      }
    })

    return group;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch group by id")
  }
}

export async function joinToGroup(userId: string, groupId: number) {
  try {
    const results = await db.member.create({
      data: {
        userId,
        groupId
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to join to group")
  }
}

export async function deleteGroup(groupId: string) {
  try {
    const results = await db.group.delete({
      where: {
        id: Number(groupId) || -1
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to delete group")
  }
}

const TOTAL_NOTIFICATIONS = 10

export async function fetchMyNotifications (userId: string, cursor?: number) {
  try {

    let notifications;

    if (cursor) {
      notifications = await db.notification.findMany({
        where: {
          userId
        },
        select: {
          group: {
            select: {
              id: true,
              title: true
            }
          }
        },
        take: TOTAL_NOTIFICATIONS,
        skip: 1,
        cursor: {
          id: cursor
        }
      })
    }else {
      notifications = await db.notification.findMany({
        where: {
          userId
        },
        select: {
          group: {
            select: {
              id: true,
              title: true
            }
          }
        },
        take: TOTAL_NOTIFICATIONS
      })
    }

    const nextCursor = notifications.length === TOTAL_NOTIFICATIONS
      ? notifications[notifications.length - 1].group.id : null;

    return {
      notifications,
      nextCursor
    }
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch my notifications")
  }
}