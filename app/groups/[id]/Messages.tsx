'use client';

import Spinner from "@/components/Spinner";
import { useQueryGroupMessages } from "@/hooks/use-query-messages";
import { tiempoTranscurrido } from "@/lib/utils";
import { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { Divider } from "./divider";
import { useChatGroupSocket } from "@/hooks/use-chat-group-socket";
import { useGlobalError } from "@/components/providers/GlobalErrorProvider";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner width={50} height={50} />
    </div>
  )
}

export default function GroupMessages(
  { apiUrl, groupId, userId }
  : {
    apiUrl: string;
    groupId: string;
    userId: string;
  }
) {

  const addKey = `chat:${groupId}:messages`;
  const queryKey = `messages:${userId}`;

  const { setError } = useGlobalError()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, status, isLoading, error, isPending, fetchStatus } = useQueryGroupMessages({ apiUrl, groupId, userId });
  useChatGroupSocket({addKey, queryKey})

  if (fetchStatus === 'fetching' || isLoading || isPending) {
    return <LoadingSpinner />
  }

  if (status === 'error') setError(error?.message!)

  return (
    <div className="grow flex flex-col gap-4">
      {
        data?.pages?.map(({ messages }, index) => (
          <Fragment key={`${index}:${Math.random() * 1000}`}>
            {
              messages.map((msg, ind) => (
                <Fragment key={`${msg.id}:${ind}`}>
                  <div className="flex gap-4 items-start relative">
                    <div className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]">
                      <img src={msg.emisorUser.image!} alt="Image" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex grow flex-col gap-y-1 justify-center">
                      <span className="text-sm text-neutral-500">{tiempoTranscurrido(msg.created_at.toString())}</span>
                      <h2 className="font-semibold">{msg.emisorUser.name}</h2>
                      <p className="text-neutral-300">{msg.message}</p>
                    </div>
                    {
                      (msg.status !== 'deleted' && msg.emisorUser.id === userId) && (
                        <button className="absolute p-2 bg-none text-gray-500 hover:text-gray-400 top-0 rounded right-2">
                          <FaTrash size={25} />
                        </button>
                      )
                    }
                  </div>
                  {
                    ind !== messages.length-1 && <Divider />
                  }
                </Fragment>
              ))
            }
          </Fragment>
        ))
      }
    </div>
  )
}