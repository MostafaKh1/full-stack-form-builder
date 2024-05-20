"use client"; // This is a client component 👈🏽


import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React, {useEffect} from 'react'


function Error({error} : {error: Error}) {
    useEffect(() => {
        console.log(error)
    },[error])
  return (
    <div className='flex flex-col items-center gap-4  justify-center  w-full'>
        <h1 className='text-2xl font-bold text-destructive'>Something went wrong </h1>
        <Button>
            <Link href={`/`} >Back to home page</Link>
        </Button>
    </div>
  )
}

export default Error