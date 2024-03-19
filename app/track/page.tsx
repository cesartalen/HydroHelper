"use client"

import { todayWaterlog } from '@/actions/today-waterlog'
import { updateWater } from '@/actions/update-water'
import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const TrackPage = () => {
  const { data: session, status } = useSession()

  if(status === "unauthenticated") {
    redirect('/')
  }

  const [water, setWater] = useState(0)

  const handleClick = async () => {
    await updateWater(session?.user?.id, 250).then(() => { getWater() })
  }

  const getWater = async () => {
    setWater((await todayWaterlog(session?.user?.id)).amount)
  }

  useEffect(() => {
    getWater();
  }, []);
  return (
    <>
      <main className='flex break-all flex-col md:flex-row'>
        <div className='rounded-xl border px-6 py-4 mx-6 my-6 md:w-3/4'>
          <p>Welcome {session?.user?.name} : {session?.user?.id}</p>
          <p>{water}</p>
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