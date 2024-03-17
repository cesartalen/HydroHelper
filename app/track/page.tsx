"use client"

import { useSession } from 'next-auth/react'

const TrackPage = () => {
  const { data: session, status } = useSession()
  return(
    <>
      <p>Welcome {session?.user?.name}</p>
    </>
  )
}

export default TrackPage