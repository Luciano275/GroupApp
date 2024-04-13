'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { TypeModal, useModal, useModalState } from "../providers/ModalProvider"
import { Modal, Box, Typography } from "@mui/material"
import { ResponseGroupAction } from "@/types"
import { createGroupAction, joinToGroupAction } from "@/lib/actions"
import ErrorMessage from "./form-error"
import { usePathname, useRouter } from "next/navigation"
import Spinner from "../Spinner"
import FormErrorMessage from "./FormErrorMessage"

const ModalCreate = ({inputClassName, state, setGroupName}: {inputClassName: string; state: ResponseGroupAction; setGroupName: Dispatch<SetStateAction<string>>}) => {
  return (
    <div>
      <input
        type="text"
        name="group-name"
        className={inputClassName}
        placeholder="Título del grupo"
        onChange={(e) => setGroupName(e.target.value)}
        aria-describedby="group-name-error"
      />

      <ErrorMessage
        state={state}
        id={"group-name-error"}
        field="title"
      />
    </div>
  )
}

const ModalJoin = ({inputClassName, state, setGroupCode}: {inputClassName: string; state: ResponseGroupAction; setGroupCode: Dispatch<SetStateAction<string>>}) => {
  return (
    <div>
      <input
        type="text"
        name="group-code"
        className={inputClassName}
        placeholder="Código del grupo"
        onChange={(e) => setGroupCode(e.target.value)}
        aria-describedby="group-code-error"
      />

      <ErrorMessage state={state} id={"group-code-error"} field="code" />
    </div>
  );
}

export default function ModalGroup({userId}: {userId: string;}) {

  const inputClassName = "p-2 bg-gray-900 rounded outline-none border border-gray-900 focus:border-gray-500 placeholder:text-neutral-700 w-full"

  const { show, openCloseModal, type } = useModal()

  const initialState = {
    message: null,
    errors: {},
    success: null
  }
  
  const { state, setState } = useModalState();
  
  const [ pending, setPending ] = useState<boolean>(false);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  const title = type === 'create' ? 'Crear grupo' : 'Codigo del grupo';
  const buttonText = type === 'create' ? 'Crear' : 'Unirme';

  const handleSubmit = async (type: TypeModal, e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.toString())

    if (type === 'create') {
      const formData = new FormData();
      formData.append('title', groupName);
      formData.append('code', groupCode)
      
      setPending(true)
      const results = await createGroupAction(formData, userId);

      if (results.success) {
        params.set('new_group', groupName);
        replace(`${pathname}?${params.toString()}`)
      }
      
      setState(results);
      setPending(false);

      return;
    }
    
    setPending(true)
    const results = await joinToGroupAction(groupCode, userId)

    if (results.success) {
      params.set('new_group', groupCode)

      replace(`${pathname}?${params.toString()}`)
    }

    setState(results);
    setPending(false);
  }

  const bindSubmit = handleSubmit.bind(null, type);

  return (
    <Modal
      open={show}
      onClose={() => {
        openCloseModal();
        setState(initialState);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box className="bg-gray-800 w-full max-w-[400px] min-h-fit max-h-[600px] rounded px-4 py-8 outline-none">
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          className="border-b border-neutral-700 pb-2"
        >
          {title}
        </Typography>
        <form className="flex flex-col gap-y-4 mt-5" onSubmit={bindSubmit}>
          {type === "create" && (
            <ModalCreate
              setGroupName={setGroupName}
              state={state}
              inputClassName={inputClassName}
            />
          )}
          {type === "join" && (
            <ModalJoin
              setGroupCode={setGroupCode}
              state={state}
              inputClassName={inputClassName}
            />
          )}

          <button
            aria-disabled={pending}
            className={`${
              !pending
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-400 cursor-default"
            } p-2 rounded outline-none`}
          >
            {buttonText}
          </button>
          {pending && (
            <div className="flex justify-center items-center p-2">
              <Spinner />
            </div>
          )}
          
          <FormErrorMessage state={state} />
        </form>
      </Box>
    </Modal>
  );
}