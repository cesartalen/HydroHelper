"use server"

import { db } from '@/lib/db'

export const getWeekWaterLogs = async (userId: any) => {
  const today = new Date()
  today.setHours(0,0,0,0)

  const lastWeek = new Date(today)
  lastWeek.setDate(lastWeek.getDate() - 7)

  let waterLogs = await db.waterLog.findMany({
    where: {
      userId: userId,
      date: {
        gte: lastWeek,
        lte: today,
      },
    },
    orderBy: {
      date: 'desc'
    }
  })

  return waterLogs
}