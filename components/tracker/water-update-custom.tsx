import { FormEvent, useState } from 'react'

type WaterUpdateCustomProps = {
  addWater: (value: number, inc: boolean) => void
  removeWater: (value: number, inc: boolean) => void
}

export const WaterUpdateCustom = ({addWater, removeWater} : WaterUpdateCustomProps) => {
  const [water, setWater] = useState(0)

  const handleWaterChange = (e: FormEvent<HTMLInputElement>) => {
    setWater(Number(e.currentTarget.value))
  }

  return (
  <>
    <div className='flex flex-col'>
      <a className='mb-4'>Manual water input</a>
      <input className='mb-8 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 focus:border-cyan-500 outline-none' placeholder='Water (ml)' type='number' onChange={handleWaterChange}></input>
      <div className='flex flex-row '>
        <button className='grow mx-4 border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500  rounded-full px-4 py-2 w-20' onClick={() => addWater(water, true)}>Add</button>
        <button className='grow mx-4 border transition duration-300 ease-in-out hover:ring-2 hover:ring-red-500 rounded-full px-4 py-2 w-20' onClick={() => removeWater(water, false)}>Remove</button>
      </div>
    </div>
  </>
)
}