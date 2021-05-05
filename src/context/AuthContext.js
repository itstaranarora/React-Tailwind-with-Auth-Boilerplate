import React, { createContext, useState, useEffect } from "react";
import { cleanLocalStorage, getAccess, getRefresh } from "utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    cleanLocalStorage();
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const access = getAccess();
    const refresh = getRefresh();
    if (access && access !== "" && refresh && refresh !== "") {
      setLoggedIn();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setLoggedIn,
        setLoggedOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
