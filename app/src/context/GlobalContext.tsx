import { createContext, PropsWithChildren, useContext } from 'react'
import { DBManager } from '../api/core/db'

interface GlobalContext {
    db: DBManager
}

const Context = createContext<GlobalContext | null>(null)

export default function GlobalContextProvider({ db, children }: PropsWithChildren<GlobalContext>) {
    return (
        <Context.Provider value={{ db }}>
            {children}
        </Context.Provider>
    )
}

export function useGlobalContext() {
    const context = useContext(Context)
    if (context === null) {
        throw new Error(`${useGlobalContext.name} hook must be used inside a ${GlobalContextProvider.name} component`)
    }
    return context
}
