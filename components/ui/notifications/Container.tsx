import Spinner from "@/components/Spinner"

export default function NotificationContainer(
  {children, show, status}:
  {
    children: React.ReactNode;
    show: boolean;
    status: "pending" | "error" | "success"
  }
) {
  return (
    <div
        className={`absolute ${
          show ? "right-4" : "-right-[400px]"
        } top-20 min-w-[340px] min-h-[300px] max-w-[340px] max-h-[300px] overflow-x-hidden overflow-y-auto bg-gray-900 transition-all rounded-xl p-2 flex flex-col gap-y-4`}
      >
        {status === "pending" ? (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
            <p className="text-red-600">Error al cargar notificaciones</p>
          </div>
        ) : (
          <>
            {children}
          </>
        )}
      </div>
  )
}