"use client"

import { getWeekWaterLogs } from '@/actions/get-week-waterlogs'
import { addDays, format } from 'date-fns'
import { useEffect, useState } from 'react'

export const WaterWeeklyStats = ({userId} : {userId: any}) => {
  const [waterLogs, setWaterLogs] = useState<any[]>([])

  const fetchWaterLogs = async () => {
    const logs = await getWeekWaterLogs(userId)
    setWaterLogs(logs)  
  }

  useEffect(() => {
    fetchWaterLogs()
  }, [])

  const createWeekDates = () => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const prevWeekDates = []
  
    for (let i = 0; i < 7; i++) {
      prevWeekDates.push(addDays(today, -i))
    }
  
    return prevWeekDates
  }

  return(
    <ul>
    <p>Average this week:</p> 
    {<p className='font-bold text-cyan-700'>{Math.floor(waterLogs.reduce((sum, log) => sum + log.amount, 0) / waterLogs.length)} ml</p>}
    {waterLogs.map((val, key) => (
      <li key={key}>
        <a>{format(val.date, 'E')}: {val.amount}</a>
      </li>
    ))}
  </ul>
  )
}