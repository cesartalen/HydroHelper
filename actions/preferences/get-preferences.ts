"use server"

import { db } from '@/lib/db'

export const getPreferences = async(userId: any) => {
  let userPreferences = await db.userTrackerPreset.findUnique({
    where: {
      userId: userId,
    }
  })
  
  if(!userPreferences) {
    userPreferences = await db.userTrackerPreset.create({
      data: {
        userId: userId,
      }
    })
  }
  return userPreferences 
}