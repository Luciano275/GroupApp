import { db } from "./db";

export async function fetchMyGroups(id: string) {
  try {

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const groups = await db.group.findMany({
      where: {
        members: {
          every: {
            userId: id
          }
        }
      },
      select: {
        id: true,
        title: true
      }
    })

    return groups
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch groups")
  }
}