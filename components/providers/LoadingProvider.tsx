'use client'

import { useContext, createContext, useState } from 'react';
import Spinner from '../Spinner';

interface ILoadingContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: (loading: boolean) => {},
})

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingContext = (loading: boolean) => setLoading(loading);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading: setLoadingContext,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const Loading = () => {

  const { loading } = useLoading()

  if (loading) {
    return (
      <div className={`fixed top-0 left-0 z-50 min-w-full min-h-dvh max-h-dvh bg-black bg-opacity-50 flex justify-center items-center`}>
        <Spinner
          width={80}
          height={80}
          borderWidth={4}
        />
      </div>
    )
  }
}