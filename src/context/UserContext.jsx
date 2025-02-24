import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    if (!user) {
      return;
    }
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};