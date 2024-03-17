"use client"

import { todayWaterlog } from '@/actions/today-waterlog'
import { updateWater } from '@/actions/update-water'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const TrackPage = () => {
  const { data: session, status } = useSession()
  const [water, setWater] = useState(0)

  const handleClick = async () => {
    await updateWater(session?.user?.id, 250).then(() => {getWater()})
  }

  const getWater = async () => {
    setWater((await todayWaterlog(session?.user?.id)).amount)
  }

  useEffect(() => {
    if (session?.user?.id) {
      getWater();
    }
  }, [session]);
  return(
    <>
      <p>Welcome {session?.user?.name} : {session?.user?.id}</p>
      <p>{water}</p>
      <button onClick={handleClick}>Update Water</button>
    </>
  )
}

export default TrackPage