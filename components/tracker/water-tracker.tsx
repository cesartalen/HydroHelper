import { todayWaterlog } from '@/actions/today-waterlog'
import { addWater } from '@/actions/add-water'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LoadingIndicator } from '../common/loading-indicator'
import { WaterUpdateCustom } from './water-update-custom'
import { removeWater } from '@/actions/remove-water'

export const WaterTracker = ({name, userId, goal, waterPreset} : {name : any, userId : any, goal: number, waterPreset: number }) => {
  const [water, setWater] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleWaterClick = async (amount: number, inc: boolean) => {
    if(inc) {
      await addWater(userId, amount)
    } else {
      await removeWater(userId, amount)
    }

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
          <p>Welcome {name}!</p>
          <p>{water}/{<span className="text-cyan-500">{goal}</span>} Todays goal</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${Math.min((water * 100) / goal, 100)}%` }}></div>
          </div>
          <button className=' block mx-auto mt-6 w-2/3 border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500  rounded-full px-4 py-2 w-20' onClick={() => handleWaterClick(waterPreset, true)}>Use Preset: {waterPreset}</button>
          <br />
          <div className='mt-16'>
            <WaterUpdateCustom addWater={handleWaterClick} removeWater={handleWaterClick}/>
          </div>
        </>
      )}
    </div>
  )
}
