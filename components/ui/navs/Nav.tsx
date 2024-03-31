import { auth } from "@/auth";
import NavContent from "./content";

export default async function Nav() {

  const session = await auth();

  return (
    <nav className="bg-violet-950 py-2 px-4 flex items-center justify-between md:justify-end gap-x-5 relative">
      <NavContent
        session={session!}
      />
    </nav>
  );
}