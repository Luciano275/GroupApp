'use client'

import React, { useContext, createContext, useState, useEffect } from 'react';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client'

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
    const socketInstance = io('http://localhost:3000', {
      path: '/api/socket/io',
    })

    // socketInstance.on('connect', () => {
    //   setIsConnected(true)
    // })

    // socketInstance.on('disconnect', () => {
    //   setIsConnected(false)
    // })

    // socketInstance.on("connect_error", async err => {
    //   console.log(`connect_error due to ${err}`)
    //   await fetch("/api/socket/io")
    // })
    
    setSocket(socketInstance);
    
    console.log(socketInstance)
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