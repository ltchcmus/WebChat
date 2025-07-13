import { useState, createContext, useContext } from "react";

const UseListUser = createContext();

export function ListUserProvider({ children }) {
  const [listUser, setListUser] = useState([]);

  return (
    <UseListUser.Provider value={{ listUser, setListUser }}>
      {children}
    </UseListUser.Provider>
  );
}

export const useListUser = () => useContext(UseListUser);
