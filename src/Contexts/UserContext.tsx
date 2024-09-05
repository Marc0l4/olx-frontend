'use client'

import { createContext, ReactNode, useState } from "react";

type ContextType = {
    token: boolean;
    userToken: string;
    setUserToken: (newUserToken: string) => void;
    setToken: (newToken: boolean) => void
}

export const UserContext = createContext<ContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string>('');

    return (
        <UserContext.Provider value={{ token, setToken, userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
}

