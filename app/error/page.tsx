import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="p-4">
      <h2 className="text-center py-4 px-2 text-3xl">Algo salió mal ☹️</h2>
      <div className="flex justify-center">
        <Link href="/" className="w-fit py-2 px-4 text-xl rounded bg-violet-600 mx-auto mt-5 hover:bg-fuchsia-800">Volver al inicio</Link>
      </div>
    </main>
  )
}