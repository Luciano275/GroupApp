import { db } from "./db";

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
      },
      select: {
        id: true,
        title: true,
        code: true,
        userId: true,
        members: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              }
            }
          }
        },
        teacher: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
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
      },
      select: {
        id: true,
        title: true,
        teacher: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
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

export async function updateGroup(id: number, title: string) {
  try {
    const results = await db.group.update({
      data: {
        title
      },
      where: {
        id
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to update group")
  }
}

export async function fetchMembersByGroup (groupId: string) {
  try {

    await new Promise((resolve) => setTimeout(resolve, 3000))
    
    const results = await db.member.findMany({
      where: {
        groupId: Number(groupId) || -1
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    return results;
  }catch (e) {
    console.error(e);
    throw new Error("Failed to fetch members")
  }
}

export async function fetchOwnerByGroup(groupId: string) {
  try {
    const owner = await db.group.findFirst({
      where: {
        id: Number(groupId) || -1
      },
      select: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    return owner;
  }catch (e) {
    console.error(e);
    throw new Error('Failed to fetch owner')
  }
}