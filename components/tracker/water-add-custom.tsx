import { FormEvent, useState } from 'react'

export const WaterAddCustom = ({addWater} : {addWater : (value : number) => void}) => {
  const [water, setWater] = useState(0)

  const handleWaterChange = (e: FormEvent<HTMLInputElement>) => {
    try {
      setWater(Number(e.currentTarget.value))
    } catch {
      console.log('Not a number')
    }
  }

  return (
  <>
    <div>
      <input type='number' onChange={handleWaterChange}></input>
      <button onClick={() => addWater(water)}>Add</button>
    </div>
  </>
)
}