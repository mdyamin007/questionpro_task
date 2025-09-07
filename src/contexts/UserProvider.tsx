import { useCallback, useMemo, useState } from "react";
import type { StaticUser } from "../types/data.type";
import { initialUser } from "../data/userData";
import { UserContext } from "./UserContext";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<StaticUser>(initialUser);

  const setUser = useCallback((patch: Partial<StaticUser>) => {
    setUserState((prev) => ({ ...prev, ...patch }));
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
