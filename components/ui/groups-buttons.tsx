'use client'

import { MdGroup, MdGroupAdd } from "react-icons/md";
import { TypeModal, useModal } from "../providers/ModalProvider";

export default function GroupButtons () {

  const {openCloseModal, setTypeModal} = useModal();

  const openModal = (type: TypeModal) => {
    setTypeModal(type);
    openCloseModal();
  }

  return (
    <div className="flex gap-5 flex-wrap items-center">
      <button
        onClick={() => openModal('join')}
        className="bg-blue-600 w-fit px-4 py-1 rounded flex gap-x-2 justify-center items-center hover:bg-blue-800"
      >
        <MdGroup size={30} />
        Unirse a un grupo
      </button>
      <button
        className="bg-green-600 min-w-[182px] w-fit px-4 py-1 rounded flex gap-x-2 justify-center items-center hover:bg-green-800"
        onClick={() => openModal("create")}
      >
        <MdGroupAdd size={30} />
        Crear un grupo
      </button>
    </div>
  );
}