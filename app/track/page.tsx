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

  if(status === "unauthenticated") {
    redirect('/')
  }

  const [water, setWater] = useState(0)

  const handleClick = async () => {
    await updateWater(session?.user?.id, 250).then(() => { getWater() })
  }

  const getUserPreferences = async () => {
    const preferences = await getPreferences(session?.user?.id)

    if(preferences) {
      setGoal(preferences.dailyGoal)
    }
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
          <p>Welcome {session?.user?.name} : {session?.user?.id}</p>
          <p>{water}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-cyan-500 h-2.5 rounded-full" style={{width: `${(water * 100) / goal}%`}}></div>
          </div>
          <button onClick={handleClick}>Update Water</button>
          <br/>
          <button onClick={() => signOut()}>Logout</button>
        </div>
        <div className='rounded-xl border px-6 py-4 mx-6 my-6 md:w-1/4 '>
        </div>
      </main>
    </>
  )
}

export default TrackPage