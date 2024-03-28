import { ResponseErrors, ResponseGroupAction } from "@/types";

export default function ErrorMessage(
  { state, id, field }
  :
  {
    state: ResponseGroupAction;
    id: string;
    field: keyof ResponseErrors
  }
) {
  
  if (state.errors && state.errors[field]) {
    return (
      <ul id={id} aria-atomic aria-live={'polite'}>
        {state.errors[field]?.map((error, index) => (
          <li key={`${index}:${error}`} className="text-sm text-red-600">{error}</li>
        ))}
      </ul>
    )
  }

}