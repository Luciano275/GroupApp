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
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: NetServer = (req as any).socket.server;
    const io = new Server(httpServer, {
      path,
      addTrailingSlash: false
    })

    //@ts-ignore
    res.socket.server.io = io;
  }
  res.end()
}

export default ioHandler;