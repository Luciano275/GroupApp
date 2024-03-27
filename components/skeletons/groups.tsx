const Group = () => {
  return (
    <div className="w-[350px] bg-neutral-700 h-[130px] rounded animate-pulse p-4">
      <div className="w-[250px] bg-neutral-800 h-6 rounded-xl animate-pulse mb-4"></div>
      <div className="w-[120px] bg-neutral-800 h-4 rounded-xl animate-pulse"></div>
    </div>
  )
}

export const GroupSkeleton = () => {
  return (
    <div className="flex justify-center items-center gap-5 flex-wrap">
      <Group />
      <Group />
      <Group />
    </div> 
  )
}