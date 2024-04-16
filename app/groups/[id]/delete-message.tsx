import { useGlobalError } from "@/components/providers/GlobalErrorProvider";
import { useLoading } from "@/components/providers/LoadingProvider";
import { QuestionAlert } from "@/components/ui/Alert";
import { GroupMessageType } from "@/types"
import queryString from "query-string";
import { FaTrash } from "react-icons/fa"

export default function DeleteMessage (
  { msg, userId, apiUrl, groupId }
  : {
    msg: GroupMessageType;
    userId: string;
    apiUrl: string;
    groupId: string;
  }
) {

  const { setLoading } = useLoading();
  const { setError } = useGlobalError();

  const handleDelete = async () => {

    const confirm = await QuestionAlert();

    if (!confirm) {
      return;
    }

    try {

      const url = queryString.stringifyUrl({
        url: apiUrl,
        query: {
          groupId
        }
      })

      setLoading(true);
      const rq = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        cache: 'no-store'
      })
      setLoading(false);

      if (!rq.ok) {
        setError((await rq.json()).message);
        return;
      }

    }catch (e) {
      setError('Algo salio mal')
    }
  }

  return (
    (msg.status !== 'deleted' && msg.emisorUser.id === userId) && (
      <button onClick={handleDelete} className="absolute p-2 bg-none text-gray-500 hover:text-gray-400 top-0 rounded right-2">
        <FaTrash size={25} />
      </button>
    )
  )
}