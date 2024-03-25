'use client'

import { useModal } from "./providers/ModalProvider"
import { Modal, Box, Typography } from "@mui/material"

export default function ModalGroup() {

  const { show, openCloseModal, type } = useModal()

  const title = type === 'create' ? 'Nombre del grupo' : 'Codigo del grupo';
  const placeholder = type === 'create' ? 'Programación I' : '123456';
  const buttonText = type === 'create' ? 'Crear' : 'Unirme'

  return (
    <Modal
      open={show}
      onClose={openCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box className="bg-gray-800 w-full max-w-[400px] h-fit max-h-[300px] rounded px-4 py-8 outline-none">
        <Typography id="modal-modal-title" variant="h5" component="h2" className="border-b border-neutral-700 pb-2">
          {title}
        </Typography>
        <form className="flex flex-col gap-y-4 mt-5">
          <input
            type="text"
            name="group-name"
            className="p-2 bg-gray-900 rounded outline-none border border-gray-900 focus:border-gray-500 placeholder:text-neutral-700"
            placeholder={placeholder}
          />
          <button className="bg-gray-600 p-2 rounded hover:bg-gray-700">{buttonText}</button>
        </form>
      </Box>
    </Modal>
  )
}