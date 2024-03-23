"use client"

import { PreferencesHandler } from '@/components/tracker/preferences-handler'
import { WaterStatsPanel } from '@/components/tracker/water-stats-panel'
import { WaterTracker } from '@/components/tracker/water-tracker'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const TrackPage = () => {
  const { data: session, status } = useSession()

  if(status === "unauthenticated") {
    redirect('/')
  }

  return (
    <PreferencesHandler userId={session?.user?.id}>
    {(goal: number, waterPreset: number) => (
      <main className='flex break-all flex-col md:flex-row'>
        <WaterTracker userId={session?.user?.id} goal={goal} waterPreset={waterPreset} name={session?.user?.name} />
        <WaterStatsPanel userId={session?.user?.id}/>
      </main>
    )}
  </PreferencesHandler>
  )
}

export default TrackPage