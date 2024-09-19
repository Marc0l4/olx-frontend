'use client'

import { createContext, ReactNode, useState } from "react";

type ContextType = {
    token: string;
    setToken: (newToken: string) => void
}

export const UserContext = createContext<ContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>('');

    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}

