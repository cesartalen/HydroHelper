"use client"

import { createContext, useState } from 'react'

export type WaterLogType = {
  id: string
  date: Date
  userId: string
  amount: number
}

type WaterContextType = {
  water: any
  setWater: React.Dispatch<any>
  waterLog: WaterLogType
  setWaterLog: React.Dispatch<any>
  waterLogs: WaterLogType[]
  setWaterLogs: React.Dispatch<any>
}

export const WaterContext = createContext<WaterContextType>({
  water: undefined,
  setWater: () => {},
  waterLog: {
    id: '',
    date: new Date(),
    userId: '',
    amount: 0
  },
  setWaterLog: () => {},
  waterLogs: [],
  setWaterLogs: () => {}
})

export const WaterProvider = ({ children } : {
  children: React.ReactNode
}) => {
  const [water, setWater] = useState()
  const [waterLog, setWaterLog] = useState({
    id: '',
    date: new Date(),
    userId: '',
    amount: 0
  })
  const [waterLogs, setWaterLogs] = useState([])

  return(
    <WaterContext.Provider value={{water, setWater, waterLog, setWaterLog, waterLogs, setWaterLogs}}>
      {children}
    </WaterContext.Provider>
  )
}