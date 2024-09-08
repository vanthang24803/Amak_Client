"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  HttpTransportType,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import useAuth from "@/hooks/use-auth";

type SocketContextType = {
  connection: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  connection: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLogin } = useAuth();
  const [connection, setConnection] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_API_SOCKET!, {
        transport:
          HttpTransportType.WebSockets |
          HttpTransportType.ServerSentEvents |
          HttpTransportType.LongPolling,
        logger: LogLevel.Information,
      })
      .build();

    setConnection(hubConnection);

    const startConnection = async () => {
      try {
        await hubConnection.start();
        setIsConnected(hubConnection.state === HubConnectionState.Connected);
      } catch (err) {
        console.error("Error starting connection: ", err);
      }
    };

    if (isLogin) {
      startConnection();
    }

    hubConnection.on("connect", () => {
      setIsConnected(true);
    });

    hubConnection.on("disconnect", () => {
      setIsConnected(false);
    });

    hubConnection.onclose(() => {
      setIsConnected(false);
    });

    return () => {
      hubConnection.stop();
    };
  }, [isLogin]);

  return (
    <SocketContext.Provider value={{ connection, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
