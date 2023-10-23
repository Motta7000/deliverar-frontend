// userProvider.js
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
