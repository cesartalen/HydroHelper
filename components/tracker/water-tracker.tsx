import { todayWaterlog } from '@/actions/stats/today-waterlog'
import { addWater } from '@/actions/tracker/add-water'
import { signOut } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { LoadingIndicator } from '../common/loading-indicator'
import { WaterUpdateCustom } from './water-update-custom'
import { removeWater } from '@/actions/tracker/remove-water'
import { PreferencesContext } from '@/context/preferences-provider'
import { getPreferences } from '@/actions/preferences/get-preferences'
import { WaterContext } from '@/context/water-provider'

export const WaterTracker = ({name, userId} : {name : any, userId : any}) => {
  const { goal, setGoal, preset, setPreset } = useContext(PreferencesContext)
  const { water, setWater, waterLog, setWaterLog } = useContext(WaterContext)
  const [loading, setLoading] = useState(true)

  const updatePreferences = async () => {
    const preferences = await getPreferences(userId)

    setGoal(preferences.dailyGoal)
    setPreset(preferences.waterPreset)

    setLoading(false)
  }

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
    setWaterLog(waterData)
    const amount = waterData.amount
    setWater(amount)
    setLoading(false)
  }

  useEffect(() => {
    if(!waterLog.id) {
      getWater()
    }

    if(!goal || !preset) {
      updatePreferences()
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [userId])

  return (
    <div className='rounded-xl border px-6 py-4 mx-6 md:w-2/3 xl:w-3/4 mb-6 md:mb-0'>
      {loading ? (
        <LoadingIndicator/>
      ) : (
        <>
          <p>Welcome {name}!</p>
          <p className='text-cyan-700 mb-2'>Change your goal/preset in settings</p>
          <p>{water}/{<span className="text-cyan-500">{goal}</span>} Todays goal</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${Math.min((water * 100) / goal, 100)}%` }}></div>
          </div>
          <button className=' block mx-auto mt-6 border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500  rounded-full px-4 py-2' onClick={() => handleWaterClick(preset, true)}>Use Preset: {preset}</button>
          <div>
            <WaterUpdateCustom addWater={handleWaterClick} removeWater={handleWaterClick}/>
          </div>
        </>
      )}
    </div>
  )
}
