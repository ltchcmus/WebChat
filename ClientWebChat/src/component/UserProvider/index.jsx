import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCurrent, setUserCurrent] = useState({ user: "", pass: "" });

  return (
    <UserContext.Provider value={{ userCurrent, setUserCurrent }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
