'use client'

import { ReactNode, useRef } from "react"
import { AppStore, makeUserStore } from "./store"
import { Provider } from "react-redux"

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeUserStore()
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    );
}