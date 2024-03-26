"use server"

import { db } from '@/lib/db'

export const updateGoal = async (userId : any, amount: number) => {
  await db.userTrackerPreset.update({
    where: { userId: userId },
    data: { dailyGoal: amount },
  })
}