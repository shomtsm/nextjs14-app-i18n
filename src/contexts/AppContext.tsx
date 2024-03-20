'use client'
import { createContext, useContext } from 'react'

interface AppContextType {
  dict: { [key: string]: any }
}
const AppContext = createContext<AppContextType>({
  dict: {},
})

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({
  children,
  dict,
}: {
  children: React.ReactNode
  dict: { [key: string]: any }
}) => {
  return <AppContext.Provider value={{ dict }}>{children}</AppContext.Provider>
}
