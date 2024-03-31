'use client'

import { BiTrash } from "react-icons/bi";
import { QuestionAlert } from "../Alert";
import { useLoading } from "@/components/providers/LoadingProvider";
import queryString from "query-string";
import { useGlobalError } from "@/components/providers/GlobalErrorProvider";
import { useRouter } from "next/navigation";
import { InfiniteData, QueryObserverResult, RefetchOptions, useQueryClient } from "@tanstack/react-query";
import { ApiNotificationsResponse } from "@/types";

export default function DeleteNotificationButton(
  {id, refetch}
  :{
    id: number;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<InfiniteData<ApiNotificationsResponse, unknown>, Error>>;
  }
) {

  const { setLoading } = useLoading()
  const { setError } = useGlobalError()

  const handleDelete = async () => {

    const result = await QuestionAlert();

    if (result){
      setLoading(true);

      const url = queryString.stringifyUrl({
        url: `/api/notifications`,
        query: {
          notification_id: id
        },
      })

      const rq = await fetch(url, {
        method: 'DELETE'
      })

      
      if (!rq.ok) {
        setLoading(false);
        setError("Algo salio mal")
        return;
      }

      const { status } = await refetch();

      if (status === 'pending') {
        setLoading(true);
        return;
      }
      setLoading(false);

      if (status === 'error') {
        setError("Algo salio mal")
        return;
      }

    }

  }

  return (
    <button
      className="text-neutral-300 hover:text-red-500 cursor-pointer"
      title="Borrar notificación"
      onClick={handleDelete}
    >
      <BiTrash size={18} />
    </button>
  )
}