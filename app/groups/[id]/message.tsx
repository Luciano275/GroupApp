import { tiempoTranscurrido } from "@/lib/utils"
import { ApiGroupMessagesResponse } from "@/types"
import { Fragment } from "react"
import { Divider } from "./divider";
import { InfiniteData } from "@tanstack/react-query";
import DeleteMessage from "./delete-message";

export default function Messages(
  { messages, userId }
  : {
    messages?: InfiniteData<ApiGroupMessagesResponse, unknown>;
    userId: string;
  }
) {
  return (
    messages?.pages?.map(({ messages }, index) => (
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
                  <p className={`${msg.status !== 'deleted' ? 'text-neutral-300' : 'text-neutral-400 italic'}`}>{msg.message}</p>
                </div>
                
                <DeleteMessage groupId={msg.group.id.toString()} apiUrl={`/api/group/messages/${msg.id}`} msg={msg} userId={userId} />
              </div>
              {
                ind !== messages.length-1 && <Divider />
              }
            </Fragment>
          ))
        }
      </Fragment>
    ))
  )
}