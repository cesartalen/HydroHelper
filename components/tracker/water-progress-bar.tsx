export const WaterProgressBar = ({water, goal} : { water : number, goal : number}) => {
  return(
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-cyan-500 h-2.5 rounded-full" style={{width: `${Math.min((water * 100) / goal, 100)}%`}}></div>
  </div>
  )
}