"use client"

import { getPreferences } from '@/actions/preferences/get-preferences'
import { UpdateGoal } from '@/components/settings/update-goal'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const SettingsPage = () => {
  const { data: session, status } = useSession()
  const [goal, setGoal] = useState(0)

  const updatePreferences = async () => {
    const preferences = await getPreferences(session?.user?.id)

    setGoal(preferences.dailyGoal)
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
        <UpdateGoal userId={session?.user?.id} goal={goal} goalUpdated={updatePreferences}/>
      </div>
    </>
  )
}

export default SettingsPage