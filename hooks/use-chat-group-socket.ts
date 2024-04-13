import { useSocket } from "@/components/providers/SocketProvider";
import { GroupMessageType, ReactQueryGroupMessagesResponse } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatGroupSocket = (
  { addKey, queryKey }
  : {
    addKey: string;
    queryKey: string;
  }
) => {

  const { socket } = useSocket()
  const queryClient = useQueryClient();

  useEffect(() => {

    if (!socket) {
      return;
    }

    socket.on(addKey, (message: GroupMessageType) => {
      queryClient.setQueryData([queryKey], (oldData: ReactQueryGroupMessagesResponse) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
                nextCursor: null
              }
            ]
          } satisfies ReactQueryGroupMessagesResponse
        }

        let newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          messages: [
            message,
            ...newData[0].messages,
          ]
        }
        
        return {
          ...oldData,
          pages: newData
        }
      })
    })

    return () => {
      socket.removeAllListeners(addKey)
    }

  }, [addKey, queryKey, socket, queryClient])

}