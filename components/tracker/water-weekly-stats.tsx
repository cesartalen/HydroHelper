"use client"

import { getWeekWaterLogs } from '@/actions/stats/get-week-waterlogs'
import { WaterContext } from '@/context/water-provider'
import { addDays, format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'

const createWeekDates = () => {
  const today = new Date()
  today.setHours(0,0,0,0)
  const prevWeekDates = []

  for (let i = 0; i < 7; i++) {
    prevWeekDates.push(addDays(today, -i))
  }

  return prevWeekDates
}

export const WaterWeeklyStats = ({userId} : {userId: any}) => {
  const { waterLogs, setWaterLogs } = useContext(WaterContext)

  const fetchWaterLogs = async () => {
    const logs = await getWeekWaterLogs(userId)
    setWaterLogs(logs)  
  }

  useEffect(() => {
    if(!waterLogs.length) {
      fetchWaterLogs()
    }
  }, [])

  const prevWeekDays = createWeekDates()

  return(
    <ul>
    <p>Average this week:</p> 
    {<p className='font-bold text-cyan-700'>{Math.floor(waterLogs.reduce((sum, log) => sum + log.amount, 0) / waterLogs.length)} ml</p>}
    {prevWeekDays.map((date) => {
    const log = waterLogs.find((log) => format(log.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      return(
        <li key={date.getTime()}>
          <a>{format(date, 'E')}: {log ? log.amount : 0}</a>
        </li>
      )
  })}
  </ul>
  )
}