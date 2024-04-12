import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { PostGroupMessage } from "@/schemas/group-message";
import { belongGroup, fetchGroupById, fetchMembersByGroup } from "@/lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'})
  }

  try {

    const parsedData = PostGroupMessage.safeParse(req.body);
    const { groupId, userId } = req.query;

    if (!parsedData.success) {
      return res.status(400).json({
        errors: parsedData.error.flatten().fieldErrors,
        message: 'Completa los campos para enviar el mensaje',
        success: false
      })
    }

    if (!groupId) {
      return res.status(400).json({ message: 'Group ID es requerido' })
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID es requerido' })
    }

    const belong = await belongGroup(groupId as string, userId as string);

    if (!belong) {
      return res.status(403).json({ message: 'No tienes permitido realizar esta acción' })
    }

    const { message } = parsedData.data
    const { id } = belong;

    const isOwner = belong.userId === userId
    const newMessage = await db.groupMessage.create({
      data: {
        emisor: userId.toString(),
        group_id: id,
        message
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
              emisor: userId.toString(),
              type: 'mensaje'
            }
          })
        })
      }

    }

    res.socket.server.io.emit(`chat:${id}:messages`)

    return res.json({newMessage})

  }catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server error"
    })
  }
}