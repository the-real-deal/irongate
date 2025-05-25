import { createContext, useContext } from "react"

export interface GlobalContextType {
    x: string
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export default function useGlobalContext() {
    const context = useContext(GlobalContext)
    if (context === null) {
        throw new Error(`${useGlobalContext.name} hook must be used inside a ${GlobalContext.name} provider component`)
    }
    return context
}
