'use client';

import { Dropdown } from "flowbite-react";
import { Session } from "next-auth";
import Logout from "../logout";
import { useState } from "react";
import { getTotalNotifications } from "@/lib/utils";
import { useQueryNotifications } from "@/hooks/use-query-notifications";
import NotificationButton from "../notifications/button";
import NotificationContainer from "../notifications/container";
import NotificationContent from "../notifications/content";

export default function NavContent(
  {session}
  : {
    session: Session
  }
) {

  const [ show, setShow ] = useState(false);

  const userId = session.user?.id!;

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage, refetch } = useQueryNotifications({userId, apiUrl: '/api/notifications'})
  
  const totalNotifications = getTotalNotifications(data);

  return (
    <>
      <NotificationButton
        show={show}
        setShow={setShow}
        status={status}
        totalNotifications={totalNotifications}
      />

      <NotificationContainer show={show}>
        <NotificationContent
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          refetch={refetch}
        />
      </NotificationContainer>

      <div className="flex gap-x-2 items-center">
        <div className="hidden sm:block">
          <h2 className="text-lg sm:text-xl">{session.user?.name}</h2>
          <p className="text-neutral-400 text-sm">{session.user?.email}</p>
        </div>
        <Dropdown
          label=""
          dismissOnClick={false}
          className="bg-violet-950 border-violet-900"
          renderTrigger={() => (
            <img
              src={session.user?.image!}
              alt={'logo'}
              className="rounded-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] cursor-pointer transition-all hover:blur-sm"
            />
          )}
        >
          <Dropdown.Item className="text-white hover:bg-violet-800">
            <Logout />
          </Dropdown.Item>
        </Dropdown>
      </div>
      
    </>
  )
}