"use client"

import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const HomePage = () => {
  const { data: session, status } = useSession()

  if(status === "authenticated") {
    redirect('/track')
  }
  
  return (
    
    <>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-50">
        <div className="m-16">
          <h1 className="text-5xl font-bold mb-2 text-center bg-gradient-to-r from-cyan-300 to-sky-600 inline-block text-transparent bg-clip-text">HydroHelper</h1>
          <p className="text-lg text-gray-600 text-center mb-4">Monitor your hydration habits</p>
        </div>
        <div className="bg-white p-8 rounded shadow-md max-w-xs w-full">
          <h2 className="text-2xl font-semibold mb-2">Sign in</h2>
          <p className="text-gray-600 mb-2">Start tracking today</p>
          <button onClick={() => signIn("github")} className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded w-full">Login with Github</button>
        </div>
      </div>
    </>
  )
}

export default HomePage