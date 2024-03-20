"use server"

import { db } from '@/lib/db'

export const getPreferences = async(userId: any) => {
  const userPreferences = await db.userTrackerPreset.findUnique({
    where: {
      id: userId,
    }
  })

  return userPreferences 
}