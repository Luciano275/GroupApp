import { NextApiResponseServerIo } from "@/types"
import { Server as NetServer } from "http";
import { NextApiRequest } from "next"
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false
  }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (res.socket.server.io) {
    res.status(200).json({message: 'Socket is already running'});
    return;
  }
  const io = new Server({
    path: '/api/socket/io',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_SITE_URL
    }
  })

  res.socket.server.io = io;

  res.status(201).json({message: 'Socket is started!'})
}

export default ioHandler;