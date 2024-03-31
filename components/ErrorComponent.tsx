import Link from "next/link";

export default function ErrorComponent({title, session}: {title: string, session: boolean}) {
  return (
    <main className="p-2 min-h-dvh max-h-dvh flex flex-col justify-center items-center">
      <h2 className="text-center py-4 px-2 text-3xl">{title}</h2>
      <div className="flex justify-center">
        <Link href={session ? '/groups' : '/'} className="w-fit py-2 px-4 text-xl rounded bg-violet-600 mx-auto mt-5 hover:bg-fuchsia-800">Volver al inicio</Link>
      </div>
    </main>
  )
}