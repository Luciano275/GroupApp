const Group = () => {
  return (
    <div className="w-[380px] bg-neutral-700 h-[170px] rounded animate-pulse p-4">
      <div className="w-[250px] bg-neutral-800 h-6 rounded-xl animate-pulse mb-4"></div>
      <div className="w-[120px] bg-neutral-800 h-4 rounded-xl animate-pulse"></div>
    </div>
  )
}

export const GroupSkeleton = () => {
  return (
    <div className="flex items-center gap-5 flex-wrap justify-center">
      <Group />
      <Group />
      <Group />
      <Group />

      <Group />
      <Group />
      <Group />
      <Group />
    </div> 
  )
}