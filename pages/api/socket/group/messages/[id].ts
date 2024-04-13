import { auth } from "@/auth";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  // if (req.method !== 'DELETE') {
  //   return res.status(405).json({message: 'Method not allowed'})
  // }

  try {

    const { id, groupId } = req.query;

    const userId = (await auth())?.user?.id!;

    if (!groupId) {
      return res.status(400).json({message: 'Group ID es requerido'})
    }

  }catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server error"
    })
  }
}