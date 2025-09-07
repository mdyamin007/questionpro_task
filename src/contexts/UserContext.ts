import { createContext, useContext } from "react";
import type { StaticUser } from "../types/data.type";

type Ctx = {
  user: StaticUser;
  setUser: (patch: Partial<StaticUser>) => void;
};

export const UserContext = createContext<Ctx | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
