"use server"

import { db } from '@/lib/db'
import { todayWaterlog } from './today-waterlog'

export const addWater = async (userId: any, amount: number) => {
  const waterLog = await todayWaterlog(userId)
  const totalWater = waterLog.amount + amount

  await db.waterLog.update({
    where: { id: waterLog.id },
    data: { amount: totalWater },
  })
}