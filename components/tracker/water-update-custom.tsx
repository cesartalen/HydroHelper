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
    <div>
      <input type='number' onChange={handleWaterChange}></input>
      <button onClick={() => addWater(water, true)}>Add</button>
      <button onClick={() => removeWater(water, false)}>Remove</button>
    </div>
  </>
)
}