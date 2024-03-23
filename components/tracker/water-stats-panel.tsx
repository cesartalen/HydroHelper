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
    <div className='rounded-xl border px-6 py-4 mx-6 md:w-1/4'>
      <ul>
        {waterLogs.map((val, key) => (
          <li key={key}>
            <a>{format(val.date, 'E')}: {val.amount}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}