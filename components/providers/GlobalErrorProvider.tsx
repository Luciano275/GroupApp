'use client'

import { useContext, createContext, useState } from 'react'

interface GlobalErrorContext {
  error: string | null
  setError: (msg: string|null) => void
}

const GlobalErrorContext = createContext<GlobalErrorContext>({
  error: null,
  setError: (msg: string|null) => {},
})

export const useGlobalError = () => useContext(GlobalErrorContext)

export const GlobalErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null)

  const setErrorContext = (msg:string|null) => setError(msg)

  return (
    <GlobalErrorContext.Provider
      value={{
        error,
        setError: setErrorContext
      }}
    >
      {children}
    </GlobalErrorContext.Provider>
  )
}