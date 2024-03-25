import { todayWaterlog } from '@/actions/today-waterlog'
import { addWater } from '@/actions/add-water'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LoadingIndicator } from '../common/loading-indicator'
import { WaterAddCustom } from './water-add-custom'

export const WaterTracker = ({name, userId, goal, waterPreset} : {name : any, userId : any, goal: number, waterPreset: number }) => {
  const [water, setWater] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleWaterClick = async (amount: number) => {
    await addWater(userId, amount)
    await getWater()
  }

  const getWater = async () => {
    const waterData = await todayWaterlog(userId)
    const amount = waterData.amount
    setWater(amount)
    setLoading(false)
  }

  useEffect(() => {
    getWater()
  }, [userId])

  return (
    <div className='rounded-xl border px-6 py-4 mx-6 md:w-2/3 xl:w-3/4 mb-6 md:mb-0'>
      {loading ? (
        <LoadingIndicator/>
      ) : (
        <>
          <p>Welcome {name} : {userId}</p>
          <p>{water}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${Math.min((water * 100) / goal, 100)}%` }}></div>
          </div>
          <button onClick={() => handleWaterClick(waterPreset)}>Update Water</button>
          <br />
          <WaterAddCustom addWater={handleWaterClick}/>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  )
}
