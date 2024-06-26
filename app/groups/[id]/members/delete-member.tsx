'use client'

import { useLoading } from "@/components/providers/LoadingProvider";
import { QuestionAlert } from "@/components/ui/Alert";
import { skorsMemberAction } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { FaUserMinus } from "react-icons/fa";

export default function DeleteMember(
  { memberId, userId, groupId }
  : {
    memberId: number;
    userId: string;
    groupId: number;
  }
) {

  const { setLoading } = useLoading()
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = async () => {
    const confirm = await QuestionAlert()
    
    if (confirm) {

      setLoading(true);
      const results = await skorsMemberAction(memberId, userId, groupId);
      setLoading(false);

      if (results.success) {
        const params = new URLSearchParams(window.location.toString())

        if (params.get('delete_member')) {
          params.delete('delete_member')
        }else {
          params.set('delete_member', '1')
        }

        replace(`${pathname}?${params.toString()}`)
      }

    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-neutral-800 p-2 rounded text-red-500 hover:bg-neutral-900"
        onClick={handleClick}
      >
        <FaUserMinus size={25} />
      </button>
    </div>
  )
}