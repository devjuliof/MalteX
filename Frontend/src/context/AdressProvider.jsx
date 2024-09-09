import React from 'react';

export const AdressContext = React.createContext();

export const AdressProvider = ({ children }) => {
  const [adress, setAdress] = React.useState({});
  return (
    <AdressContext.Provider value={{ adress, setAdress }}>
      {children}
    </AdressContext.Provider>
  );
};
