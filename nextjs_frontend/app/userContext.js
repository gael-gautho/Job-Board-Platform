'use client'
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ userId, children }) {
  return (
    <UserContext.Provider value={userId}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
