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

export type ApiGroupMessagesResponse = {
  messages: {
      group: {
          id: number;
          title: string;
      };
      id: string;
      message: string;
      created_at: Date;
      emisorUser: {
          name: string | null;
          email: string | null;
          image: string | null;
      };
  }[];
  nextCursor: null | number;
}

export type ReactQueryGroupMessagesResponse = {
  pages?: {
    messages: ApiGroupMessagesResponse[];
  }
  pageParams: Number[]
}