"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data: session, status } = useSession()
  return(
    <>
      <header className='px-6 py-4 mx-6 my-6 rounded-xl border'>
        <div className='w-full flex justify-between items-center'>
          <a className="text-xl font-bold text-center bg-gradient-to-r from-cyan-300 to-sky-600 inline-block text-transparent bg-clip-text">
            HydroHelper
          </a>
          <div className='flex flex-row space-x-2'>
            <Link href="/settings" className=' border transition duration-300 ease-in-out hover:ring-2 hover:ring-cyan-500 rounded-full px-4 py-2'>
                Settings
            </Link>
            <div>
              <button className=' border transition duration-300 ease-in-out hover:ring-2 hover:ring-red-500 rounded-full px-4 py-2' onClick={() => signOut()}>
                    Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}