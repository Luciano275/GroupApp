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
    <main className="min-h-dvh animate-blurred-fade-in flex flex-col">
      <div className="fixed top-0 left-0 -z-10 w-full min-h-dvh max-h-dvh overflow-hidden">
        <img
          src="/wp.jpg"
          alt="Wallpaper"
          className="min-w-[1280px] w-full h-full object-contain blur-md"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      </div>

      <section className="w-full min-h-fit grow lg:w-[40%] bg-gray-900 bg-opacity-95 flex flex-col py-5 rounded-tr-xl rounded-br-xl">
        <header>
          <h1 className="text-4xl text-center py-5 px-2">
            Bievenido a <span className="font-bold text-fuchsia-500">Chat App</span>
          </h1>
        </header>
        <div className="grow flex flex-col items-center gap-y-5 justify-center px-2">
          <button
            className="relative w-full max-w-[300px] py-2 px-4 text-xl rounded bg-neutral-100 flex justify-center items-center hover:bg-neutral-200 text-black"
            onClick={() => onLogin("google")}
          >
            <img
              src="/google.svg"
              alt="logo de google"
              className="w-[35px] h-[35px] absolute left-2"
            />
            Google
          </button>
          <button
            className="relative w-full max-w-[300px] py-2 px-4 text-xl rounded bg-neutral-800 flex justify-center items-center hover:bg-neutral-700"
            onClick={() => onLogin("github")}
          >
            <img
              src="/github.svg"
              alt="logo de google"
              className="w-[35px] h-[35px] absolute left-2"
            />
            GitHub
          </button>
          <AuthError />
        </div>
        {error && <p className="mt-5 text-red-600">{error}</p>}
        <footer className="flex justify-center py-5">
          <p>Creado por <a href="https://github.com/Luciano275" className="text-blue-300 hover:text-blue-500">Luciano Luna</a></p>
        </footer>
      </section>
    </main>
  );
}
