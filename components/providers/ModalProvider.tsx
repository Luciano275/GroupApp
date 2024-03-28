'use client'

import { ResponseGroupAction } from '@/types';
import { createContext, useContext, useState } from 'react'

export type TypeModal = 'create' | 'join'

interface IModalCreateContext {
  show: boolean;
  type: TypeModal
  openCloseModal: () => void
  setTypeModal: (type: TypeModal) => void
}

interface IModalStateContext {
  state: ResponseGroupAction;
  setState: (data: ResponseGroupAction) => void
}

export const initialStateModal = {
  message: null,
  errors: {},
  success: null
}

const ModalContext = createContext<IModalCreateContext>({
  show: false,
  type: 'create',
  openCloseModal: () => {},
  setTypeModal: () => {}
})

const ModalStateContext = createContext<IModalStateContext>({
  state: initialStateModal,
  setState: () => {}
})

export const useModal = () => useContext(ModalContext)
export const useModalState = () => useContext(ModalStateContext)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState<TypeModal>("create");

  const [state, setNewState] = useState<ResponseGroupAction>(initialStateModal)

  const changeState = (data: ResponseGroupAction) => setNewState(data)

  return (
    <ModalContext.Provider
      value={{
        show,
        openCloseModal: () => setShow(!show),
        type,
        setTypeModal: (type) => setType(type),
      }}
    >
      <ModalStateContext.Provider value={{
        state,
        setState: changeState
      }}>
        {children}
      </ModalStateContext.Provider>
    </ModalContext.Provider>
  );
};