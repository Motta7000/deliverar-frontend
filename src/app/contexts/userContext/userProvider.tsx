// providers/UserProvider.js
import { useEffect, useState, createContext, useContext } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
