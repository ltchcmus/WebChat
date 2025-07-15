import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let initialUser = { user: "", pass: "" };

  try {
    const stored = localStorage.getItem("userCurrent");
    if (stored) {
      initialUser = JSON.parse(stored); // ✅ parse chuỗi hợp lệ
    }
  } catch (e) {
    console.error("Lỗi khi parse localStorage:", e);
    localStorage.removeItem("userCurrent"); // dọn lỗi nếu dữ liệu sai
  }

  const [userCurrent, setUserCurrent] = useState(initialUser);

  return (
    <UserContext.Provider value={{ userCurrent, setUserCurrent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
