"use client"

import { getPreferences } from '@/actions/get-preferences'
import { todayWaterlog } from '@/actions/today-waterlog'
import { updateWater } from '@/actions/update-water'
import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const TrackPage = () => {
  const { data: session, status } = useSession()
  const [goalPercentage, setGoalPercentage] = useState(0)
  const [goal, setGoal] = useState(0)
  const [waterPreset, setWaterPreset] = useState(0)
  const [loading, setLoading] = useState(true)

  if(status === "unauthenticated") {
    redirect('/')
  }

  const [water, setWater] = useState(0)

  const handleWaterClick = async (amount: number) => {
    await updateWater(session?.user?.id, amount).then(() => { getWater() })
  }

  const getUserPreferences = async () => {
    const preferences = await getPreferences(session?.user?.id)

    if(preferences) {
      setGoal(preferences.dailyGoal)
      setWaterPreset(preferences.waterPreset)
    }

    setLoading(false)
  }

  const getWater = async () => {
    const waterData = await todayWaterlog(session?.user?.id)
    const amount = waterData.amount
    setWater(amount)
    const percentage = ((amount * 100) / 3500)
    setGoalPercentage(percentage)
  }

  useEffect(() => {
    getWater()
    getUserPreferences()
  }, []);
  return (
    <>
      <main className='flex break-all flex-col md:flex-row'>
        <div className='rounded-xl border px-6 py-4 mx-6 my-6 md:w-3/4'>
          {loading ? (
            <>
              <p>Loading...</p>
            </>
          ): (
            <>
              <p>Welcome {session?.user?.name} : {session?.user?.id}</p>
              <p>{water}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{width: `${Math.min((water * 100) / goal, 100)}%`}}></div>
              </div>
              <button onClick={() => handleWaterClick(waterPreset)}>Update Water</button>
              <br/>
              <button onClick={() => signOut()}>Logout</button>
            </>
            )}
          </div>
        <div className='rounded-xl border px-6 py-4 mx-6 my-6 md:w-1/4 '>
        </div>
      </main>
    </>
  )
}

export default TrackPage