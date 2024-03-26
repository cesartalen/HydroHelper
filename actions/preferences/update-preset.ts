"use server"

import { db } from '@/lib/db'

export const updatePreset = async (userId : any, amount: number) => {
  await db.userTrackerPreset.update({
    where: { userId: userId },
    data: { waterPreset: amount },
  })
}