import { PropsWithChildren } from 'react'
import { GlobalContext, GlobalContextType } from './GlobalContext'

export default function GlobalContextProvider({ context, children }: PropsWithChildren<{ context: GlobalContextType }>) {
    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    )
}
