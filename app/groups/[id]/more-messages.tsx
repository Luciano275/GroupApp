import Spinner from "@/components/Spinner";
import { ApiGroupMessagesResponse } from "@/types";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";

export default function MoreMessages (
  { hasNextPage, isFetchingNextPage, fetchNextPage }
  : {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ApiGroupMessagesResponse, unknown>, Error>>
  }
) {
  return (
    hasNextPage &&
      (isFetchingNextPage ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <button
          className="w-fit mx-auto text-center bg-violet-950 p-2 rounded hover:bg-purple-950"
          onClick={() => fetchNextPage()}
        >
          Ver más
        </button>
      ))
  )
}