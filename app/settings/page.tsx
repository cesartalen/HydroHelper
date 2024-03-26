"use client"

import { getPreferences } from '@/actions/preferences/get-preferences'
import { LoadingIndicator } from '@/components/common/loading-indicator'
import { UpdateGoal } from '@/components/settings/update-goal'
import { UpdatePreset } from '@/components/settings/update-preset'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const SettingsPage = () => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [goal, setGoal] = useState(0)
  const [preset, setPreset] = useState(0)

  const updatePreferences = async () => {
    const preferences = await getPreferences(session?.user?.id)

    setGoal(preferences.dailyGoal)
    setPreset(preferences.waterPreset)

    setLoading(false)
  }

  if(status === "unauthenticated") {
    redirect('/')
  }

  useEffect(() => {
    updatePreferences()
  }, [])

  return (
    <>
      <div className='rounded-xl border px-6 py-4 mx-6  mb-6 md:mb-0'>
        {loading ? (
          <LoadingIndicator/>
        ) : (
        <>
          <UpdateGoal userId={session?.user?.id} goal={goal} goalUpdated={updatePreferences}/>
          <UpdatePreset userId={session?.user?.id} preset={preset} presetUpdated={updatePreferences}/>
        </>
        )
      }
      </div>
    </>
  )
}

export default SettingsPage