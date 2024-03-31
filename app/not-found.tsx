import ErrorComponent from "@/components/ErrorComponent";
import { auth } from "@/auth";
import GroupLayout from './groups/layout'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error 404"
}

export default async function NotFoundPage() {

  const session = await auth();

  return (
    session ? (
      <GroupLayout>
        <ErrorComponent title={'Parece que la página que buscas no existe ☹️'} session={true} />
      </GroupLayout>
    ) : (
      <>
        <ErrorComponent title={'Parece que la página que buscas no existe ☹️'} session={false} />
      </>
    )
  )
}