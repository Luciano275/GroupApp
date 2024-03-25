'use client'

import { createContext, useContext, useState } from 'react'

export type TypeModal = 'create' | 'join'

interface ModalCreateContext {
  show: boolean;
  type: TypeModal
  openCloseModal: () => void
  setTypeModal: (type: TypeModal) => void
}

const ModalContext = createContext<ModalCreateContext>({
  show: false,
  type: 'create',
  openCloseModal: () => {},
  setTypeModal: () => {}
})

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<TypeModal>("create");

  return (
    <ModalContext.Provider
      value={{
        show,
        openCloseModal: () => setShow(!show),
        type,
        setTypeModal: (type) => setType(type),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};