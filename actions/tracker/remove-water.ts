"use server"

import { db } from '@/lib/db'
import { todayWaterlog } from '../stats/today-waterlog'

export const removeWater = async (userId: any, amount: number) => {
  const waterLog = await todayWaterlog(userId)

  if ((waterLog.amount - amount) >= 0 ) {
    const totalWater = waterLog.amount - amount
    await db.waterLog.update({
      where: { id: waterLog.id },
      data: { amount: totalWater },
    })
  }

  //TODO notify user
}