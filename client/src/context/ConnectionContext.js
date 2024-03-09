import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext();

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <ConnectionContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </ConnectionContext.Provider>
  );
};
