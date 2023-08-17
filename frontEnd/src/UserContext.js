import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateUser = (newUserData) => {
    setUser((prevUserData) => ({ ...prevUserData, ...newUserData }));
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    updateUser,
    setUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
