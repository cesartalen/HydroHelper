"use server"

import { db } from '@/lib/db'

export const getUserWaterlogs = async (userId: any) => {
  let waterLogs = await db.waterLog.findMany({
    where: {
      userId: userId,
    }
  })

  return waterLogs
}