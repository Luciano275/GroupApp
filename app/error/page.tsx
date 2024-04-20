import ErrorComponent from "@/components/ErrorComponent";

export const runtime = 'edge';

export default function AuthErrorPage() {
  return (
    <ErrorComponent title={'Algo salió mal ☹️'} session={false} />
  )
}