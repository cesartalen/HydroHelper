"use client"

import { getWeekWaterLogs } from '@/actions/get-week-waterlogs'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export const WaterStatsPanel = ({userId} : {userId: any}) => {
  const [waterLogs, setWaterLogs] = useState<any[]>([])

  const fetchWaterLogs = async () => {
    const logs = await getWeekWaterLogs(userId)
    setWaterLogs(logs)  
  }

  useEffect(() => {
    fetchWaterLogs()
  }, [])
  return(
    <div className='rounded-xl border px-6 py-4 mx-6 md:w-1/3 xl:w-1/4'>
      <ul>
        <p>Average this week:</p> 
        {<p className='font-bold text-cyan-700'>{Math.floor(waterLogs.reduce((sum, log) => sum + log.amount, 0) / waterLogs.length)} ml</p>}
        {waterLogs.map((val, key) => (
          <li key={key}>
            <a>{format(val.date, 'E')}: {val.amount}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}