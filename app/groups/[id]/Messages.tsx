'use client'

import Spinner from "@/components/Spinner";
import { useQueryGroupMessages } from "@/hooks/use-query-messages";
import { Fragment } from "react";

export default function GroupMessages(
  { apiUrl, socketUrl, groupId, userId }
  : {
    apiUrl: string;
    socketUrl: string;
    groupId: string;
    userId: string;
  }
) {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, status } = useQueryGroupMessages({ apiUrl, groupId, userId });

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center">
        <Spinner width={50} height={50} />
      </div>
    )
  }

  return (
    <Fragment>

      {
        data?.pages.map(({ messages }, index) => (
          <Fragment key={`${index}:${Math.random() * 1000}`}>
            {
              messages.map((msg) => (
                <div className="flex gap-4">
                  <div>
                    <img src={msg.emisorUser.image!} alt="Image" />
                  </div>
                </div>
              ))
            }
          </Fragment>
        ))
      }

    </Fragment>
  )
}