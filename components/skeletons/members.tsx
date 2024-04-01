const MemberSkeleton = () => {
  return (
    <div className="flex gap-x-4 items-center">
      <div className="w-[50px] h-[50px] bg-neutral-700 animate-pulse rounded-full"></div>

      <div className="grow flex flex-col gap-y-2">
        <div className="h-6 w-[150px] bg-neutral-700 animate-pulse rounded-xl"></div>

        <div className="h-4 w-[180px] bg-neutral-600 animate-pulse rounded-xl"></div>
      </div>
    </div>
  )
}

export const MembersSkeleton = () => {
  return (
    <>
      <MemberSkeleton />
      <div className="h-[1px] bg-neutral-800"></div>
      <MemberSkeleton />
      <MemberSkeleton />
    </>
  )
}