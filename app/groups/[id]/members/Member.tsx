import DeleteMember from "./delete-member";

export default function Member(
  { name, email, image, isOwner, userId, id }
  : {
    name: string;
    email: string;
    image: string;
    isOwner: boolean;
    userId: string;
    id: string;
  }
) {
  return (
    <article className="flex gap-x-4 items-center">
      <div className="w-[50px] h-[50px]">
        <img
          src={image}
          alt="Logo"
          className="w-full max-w-full h-full max-h-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col grow">
        <h2 className="text-xl">{name}</h2>
        <p className="text-sm text-neutral-400">{email}</p>
      </div>
      
      { (isOwner && userId !== id) && <DeleteMember /> }
    </article>
  )
}