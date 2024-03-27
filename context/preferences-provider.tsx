"use client"

import { createContext, useState } from 'react'


type PreferencesContextType = {
  goal: any
  setGoal: React.Dispatch<any>
  preset: any
  setPreset: React.Dispatch<any>
}

export const PreferencesContext = createContext<PreferencesContextType>({
  goal: undefined,
  setGoal: () => {},
  preset: undefined,
  setPreset: () => {}
})

export const PreferencesProvider = ({ children } : {
  children: React.ReactNode
}) => {
  const [goal, setGoal] = useState()
  const [preset, setPreset] = useState()

  return(
    <PreferencesContext.Provider value={{goal, setGoal, preset, setPreset}}>
      {children}
    </PreferencesContext.Provider>
  )
}