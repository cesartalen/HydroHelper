"use server"

import { db } from '@/lib/db'

export const todayWaterlog = async (userId: any) => {
  const today = new Date()
  today.setHours(0,0,0,0)

  let waterLog = await db.waterLog.findUnique({
    where: {
      userId_date: {
        userId: userId,
        date: today,
      }
    }
  })

  if(!waterLog) {
    waterLog = await db.waterLog.create({
      data: {
        userId: userId,
        date: today,
      }
    })
  }

  return waterLog
}