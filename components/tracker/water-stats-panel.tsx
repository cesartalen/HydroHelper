"use client"

import { getWeekWaterLogs } from '@/actions/stats/get-week-waterlogs'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { WaterWeeklyStats } from './water-weekly-stats'

export const WaterStatsPanel = ({userId} : {userId: any}) => {
  return(
    <div className='rounded-xl border px-6 py-4 mx-6 md:w-1/3 xl:w-1/4'>
      <WaterWeeklyStats userId={userId}/>
    </div>
  )
}