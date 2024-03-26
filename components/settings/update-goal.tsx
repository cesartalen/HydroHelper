import { updateGoal } from '@/actions/preferences/update-goal'
import { FormEvent, useState } from 'react'

export const UpdateGoal = ({ goal, userId, goalUpdated } : { goal: number, userId: any, goalUpdated: () => void }) => {
  const [goalInput, setGoalInput] = useState(0)
  
  const handleGoalChange = (e: FormEvent<HTMLInputElement>) => {
    setGoalInput(Number(e.currentTarget.value))
  }

  const updateUserGoal = () => {
    updateGoal(userId, goalInput)
    goalUpdated()
  }

  return(
    <>
      <p>
        Current Goal: {goal}
      </p>
      <input className='mb-8 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 focus:border-cyan-500 outline-none' placeholder='Daily goal (ml)' type='number' onChange={handleGoalChange}></input>
      <button className='grow mx-4 border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500  rounded-full px-4 py-2 w-20' onClick={() => updateUserGoal()}>Add</button>
    </>
  )
}