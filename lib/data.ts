import { db } from "./db";

export async function fetchMyGroups(id: string) {
  try {

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const groups = await db.group.findMany({
      where: {
        OR: [
          {
            members: {
              every:{
                userId: id
              }
            },
          },
          {
            userId: id
          }
        ]
      },
      select: {
        id: true,
        title: true,
        teacher: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })

    return groups
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch groups")
  }
}