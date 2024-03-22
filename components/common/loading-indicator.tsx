export const LoadingIndicator = () => {
  return(
    <>
      <div>
          <p>Loading...</p>
          <svg className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-75 border-t-cyan-700 border-r-cyan-700 border-l-cyan-700" viewBox="0 0 24 24"></svg>
      </div>
    </>
  )
}