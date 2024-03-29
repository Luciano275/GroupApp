'use client'

import { useState } from 'react'
import { useQueryNotifications } from "@/hooks/use-query-notifications";
import { getTotalNotifications } from "@/lib/utils";
import NotificationButton from "./Button";
import NotificationContainer from "./Container";
import NotificationContent from "./Content";

export default function ModalNotifications (
  { userId }: {
    userId: string
  }
) {

  const [show, setShow] = useState(false);

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } = useQueryNotifications({userId, apiUrl: '/api/notifications'})
  
  const totalNotifications = getTotalNotifications(data);

  return (
    <>
      
      <NotificationButton
        show={show}
        setShow={setShow}
        data={data}
        status={status}
      />

      <NotificationContainer
        show={show}
        status={status}
      >
        <NotificationContent
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          totalNotifications={totalNotifications}
        />
      </NotificationContainer>
      
    </>
  );
}