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
      <p>Sign in to start tracking</p>
      <button onClick={() => signIn("github")}>Sign in</button>
    </>
  )
}

export default HomePage