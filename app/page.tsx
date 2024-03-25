'use client'

import AuthError from "@/components/AuthError";
import { loginAction } from "@/lib/actions";
import { useState } from "react";

export default function Home() {

  const [ error, setError ] = useState<string | null>(null)

  const onLogin = async (provider: 'google' | 'github' = 'google') => {
    await loginAction(provider)
  }

  return (
    <main className="p-4">
      <h1 className="text-4xl text-center py-5 px-2">Iniciar sesión</h1>
      <AuthError />
      <div className="flex flex-col items-center gap-y-5 justify-center mt-5">
        <button className="relative w-full max-w-[300px] py-2 px-4 text-xl rounded bg-neutral-100 flex justify-center items-center hover:bg-neutral-200 text-black" onClick={() => onLogin('google')}>
          <img src="/google.svg" alt="logo de google" className="w-[35px] h-[35px] absolute left-2" />
          Google
        </button>
        <button className="relative w-full max-w-[300px] py-2 px-4 text-xl rounded bg-neutral-800 flex justify-center items-center hover:bg-neutral-700" onClick={() => onLogin('github')}>
          <img src="/github.svg" alt="logo de google" className="w-[35px] h-[35px] absolute left-2" />
          GitHub
        </button>
      </div>
      {
        error && <p className="mt-5 text-red-600">{error}</p>
      }
    </main>
  );
}
