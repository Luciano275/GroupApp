import { NextApiResponse } from "next";
import { Socket, Server as NetServer } from 'net'
import { Socket as SocketIOServer } from 'socket.io'

export type ResponseErrors = {
  title?: string[];
  code?: string[];
}

export type ResponseGroupAction = {
  errors?: ResponseErrors;
  message: null | string;
  success: null | boolean;
}

export type ApiNotificationsResponse = {
  notifications: {
    id: number;
    group: {
      id: number;
      title: string;
    };
    created_at: Date;
    type: 'expulsado' | 'solicitud';
    userEmisor: {
      id: string;
      name: string;
    };
  }[],
  nextCursor: null | number;
}

export type ReactQueryNotificationsResponse = {
  pages?: {
    notifications: ApiNotificationsResponse[],
  }[]
  pageParams: Number[]
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export type GroupMessageType = {
  group: {
      id: number;
      title: string;
  };
  id: string;
  message: string;
  created_at: Date;
  status?: string | null;
  emisorUser: {
      id: string | null;
      name: string | null;
      email: string | null;
      image: string | null;
  };
}
export type ApiGroupMessagesResponse = {
  messages: GroupMessageType[];
  nextCursor: null | number;
}

export type ReactQueryGroupMessagesResponse = {
  pages?: ApiGroupMessagesResponse[]
  pageParams?: Number[]
}