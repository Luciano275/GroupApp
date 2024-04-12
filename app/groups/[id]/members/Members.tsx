import { fetchMembersByGroup, fetchOwnerByGroup } from "@/lib/data"
import Member from "./Member";
import { auth } from "@/auth";
import { Fragment } from "react";
import { Divider } from "../divider";

export default async function Members(
  { groupId }
  : {
    groupId: string
  }
) {

  const [members, owner] = await Promise.all(
    [fetchMembersByGroup(groupId), fetchOwnerByGroup(groupId)]
  )

  const userId = (await auth())?.user?.id!

  const isOwner = owner?.teacher.id === userId;

  return (
    <Fragment>
      <Member
        id={owner?.teacher.id!}
        email={owner?.teacher.email!}
        name={owner?.teacher.name!}
        image={owner?.teacher.image!}
        isOwner={isOwner}
        userId={userId}
        groupId={Number(groupId)}
      />
      
      <Divider />

      {
        members.map(({ id: memberId, user: { id, image, name, email } }) => (
          <Member
            id={id}
            email={email!}
            name={name!}
            image={image!}
            isOwner={isOwner}
            userId={userId}
            memberId={memberId}
            groupId={Number(groupId)}
            key={`${memberId}:${id}`}
          />
        ))
      }
    </Fragment>
  )
}