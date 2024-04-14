'use client'

import React, { useContext, createContext, useState, useEffect } from 'react';
import { Socket } from 'socket.io';
import { io as ClientIO } from 'socket.io-client'

interface ISocketProviderContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketProviderContext = createContext<ISocketProviderContext>({
  isConnected: false,
  socket: null
})

export const useSocket = () => useContext(SocketProviderContext)

export const SocketProvider = (
  {children}
  : {
    children: React.ReactNode
  }
) => {
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: '/api/socket/io',
      addTrailingSlash: false
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketProviderContext.Provider value={{
      isConnected,
      socket
    }}>
      {children}
    </SocketProviderContext.Provider>
  )
}