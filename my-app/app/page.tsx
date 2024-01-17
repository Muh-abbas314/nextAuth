"use client"
// import Image from 'next/image'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'

import { useSession } from "next-auth/react"
export default function Home() {
  // const data=await getServerSession(authOptions)
  // console.log(data)
  const {data}=useSession();
  return (
  <>
  <main>
    <h1>Next App</h1>
    <h1>DATA SESSION</h1>
  {JSON.stringify(data)}
  </main>
  </>
  )
}
