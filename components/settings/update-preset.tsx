import { updatePreset } from '@/actions/preferences/update-preset'
import { FormEvent, useState } from 'react'

export const UpdatePreset = ({ preset, userId, presetUpdated } : { preset: number, userId: any, presetUpdated: () => void }) => {
  const [presetInput, setPresetInput] = useState(0)

  const handlePresetChange = (e: FormEvent<HTMLInputElement>) => {
    setPresetInput(Number(e.currentTarget.value))
  }

  const updateUserPreset = () => {
    updatePreset(userId, presetInput)
    presetUpdated()
  }

  return(
    <>
      <p>
        Current Preset: {preset}
      </p>
        <input className='mb-8 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 focus:border-cyan-500 outline-none' placeholder='Daily goal (ml)' type='number' onChange={handlePresetChange}></input>
        <button className='grow mx-4 border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500  rounded-full px-4 py-2 w-20' onClick={() => updateUserPreset()}>Add</button>
    </>
  )
}