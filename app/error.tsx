'use client';

import Error from "next/error";
import { useEffect } from "react";

export default function ErrorPage(
  { error, reset }
  :{
    error: Error & { digest?: string };
    reset: () => void
  }
) {

  useEffect(() => {
    console.error(error);
  }, [error])

  return (
    <main className="p-4 flex flex-col justify-center items-center">
      <h1 className="py-4 text-center text-3xl">Something went wrong ☹️</h1>
      <button
        onClick={() => reset()}
        className="w-fit py-2 px-4 text-xl rounded bg-violet-600 mx-auto mt-5 hover:bg-fuchsia-800"
      >
        Reintentar
      </button>
    </main>
  );
}