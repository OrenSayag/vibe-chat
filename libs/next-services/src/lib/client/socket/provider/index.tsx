'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  subscriptionId?: number;
  setSubscriptionId(id: number): void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number>();

  useEffect(() => {
    if (!subscriptionId) return;
    const socketInstance = io(
      `${process.env['NEXT_PUBLIC_BACKEND_WEBSOCKET_BASE_URL']}?subscriptionId=${subscriptionId}`
    );

    socketInstance.on('connect', () => {
      console.log('Socket connected');
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [subscriptionId]);

  return (
    <SocketContext.Provider
      value={{ socket, subscriptionId, setSubscriptionId }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = ({
  subscriptionId,
}: {
  subscriptionId: number;
}): Socket | null => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  if (!context.subscriptionId) {
    context.setSubscriptionId(subscriptionId);
  }
  return context.socket;
};
