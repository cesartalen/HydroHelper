import { getPreferences } from '@/actions/get-preferences'
import { useEffect, useState } from 'react'

export const PreferencesHandler = ({ userId, children } : { userId : any, children : any }) => {
  const [goal, setGoal] = useState(0)
  const [waterPreset, setWaterPreset] = useState(0)

  const getUserPreferences = async () => {
    const preferences = await getPreferences(userId)

    if (preferences) {
      setGoal(preferences.dailyGoal)
      setWaterPreset(preferences.waterPreset)
    }
  }

  useEffect(() => {
    getUserPreferences()
  }, [userId])

  return children(goal, waterPreset)
}