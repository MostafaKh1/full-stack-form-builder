import { ReloadIcon } from '@radix-ui/react-icons'
import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center items-center w-full'>
      <ReloadIcon className="mr-2 h-10 w-10 animate-spin" />
    </div>
  )
}

export default Loading