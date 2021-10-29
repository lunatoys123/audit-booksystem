import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [LoginName, setLoginName] = useState("");

  return (
    <AppContext.Provider value={{ LoginName, setLoginName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider};
