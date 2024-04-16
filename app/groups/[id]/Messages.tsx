'use client';

import { useQueryGroupMessages } from "@/hooks/use-query-messages";
import { pusherClient } from "@/lib/pusher";
import { ApiGroupMessagesResponse, GroupMessageType, ReactQueryGroupMessagesResponse } from "@/types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Messages from "./message";
import Spinner from "@/components/Spinner";
import { useGlobalError } from "@/components/providers/GlobalErrorProvider";
import MoreMessages from "./more-messages";

export default function GroupMessages(
  { apiUrl, groupId, userId }
    : {
      apiUrl: string;
      groupId: string;
      userId: string;
    }
) {

  const [messages, setMessages] = useState<InfiniteData<ApiGroupMessagesResponse, unknown>>({
    pageParams: [],
    pages: []
  })

  const { setError } = useGlobalError()
  const queryClient = useQueryClient();
  
  const queryKey = `messages:${groupId}:${userId}`

  const { data, error, fetchNextPage, fetchStatus, hasNextPage, isFetchingNextPage, isLoading, isPending, refetch, status } = useQueryGroupMessages({
    apiUrl,
    groupId,
    userId
  })

  if (error) {
    setError(error.message);
  }

  useEffect(() => {

    if (data) {
      setMessages(data);
    }

    pusherClient.subscribe(groupId)
      .bind('chat:messages', (message: GroupMessageType) => {

        queryClient.setQueryData([queryKey], (oldData: ReactQueryGroupMessagesResponse) => {

          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              pages: [
                {
                  messages: [message],
                  nextCursor: null
                }
              ],
              pageParams: undefined
            } satisfies ReactQueryGroupMessagesResponse
          }

          let newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            messages: [
              message,
              ...newData[0].messages
            ]
          }

          return {
            ...oldData,
            pages: newData
          }

        })

      })
      .bind('chat:messages:updated', (message: GroupMessageType) => {
        queryClient.setQueryData([queryKey], (oldData: ReactQueryGroupMessagesResponse) => {

          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = oldData.pages.map((page) => {
            return {
              ...page,
              messages: page.messages.map((msg) => {
                if (msg.id === message.id) {
                  return message;
                }
                return msg;
              })
            }
          })

          return {
            ...oldData,
            pages: newData
          }

        })
      })

    return () => {
      pusherClient.unsubscribe(groupId.toString())
      pusherClient.unbind('chat:messages')
    }
  }, [data])

  return (
    <div className="grow flex flex-col gap-4">
      { isLoading || isPending ? (
        <div className="flex justify-center items-center py-4">
          <Spinner height={80} width={80} />
        </div>
      ) :(
        <>
          <Messages
            userId={userId}
            messages={messages}
          />
          <MoreMessages
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )
      }
    </div>
  )
}