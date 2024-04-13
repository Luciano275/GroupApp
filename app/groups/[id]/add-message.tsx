'use client'

import { useGlobalError } from "@/components/providers/GlobalErrorProvider";
import { useState } from "react";
import qs from 'query-string'
import { useLoading } from "@/components/providers/LoadingProvider";

export default function AddMessage(
  { apiUrl, groupId, userId }:
  {
    userId: string;
    apiUrl: string;
    groupId: string;
  }
) {

  const { setError } = useGlobalError()
  const { setLoading } = useLoading();

  const [ message, setMessage ] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const url = qs.stringifyUrl({
        url: apiUrl,
        query: {
          groupId,
          userId
        }
      })

      setLoading(true)

      const rq = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({
          message
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setLoading(false);

      if (rq.status === 400) {
        setError((await rq.json()).message);
        return;
      }

      if (!rq.ok) {
        setError(`Error ${rq.status}`);
        return;
      }

      setMessage('');

    }catch (e) {
      console.error(e);
      setError('Algo salio mal')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-4"
    >
      <div>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Escribe tu mensaje"
          className="w-full bg-gray-900 resize-y border border-gray-800"
          aria-describedby="message-error"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <button
        className="p-2 rounded bg-purple-800 hover:bg-purple-950"
      >Enviar</button>
    </form>
  )
}