"use client"

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
    <main className='flex break-all flex-col md:flex-row'>
      <WaterTracker userId={session?.user?.id} name={session?.user?.name} />
      <WaterStatsPanel userId={session?.user?.id}/>
    </main>
  )
}

export default TrackPage