
import CardStatsWrapper, { StatsCards } from '@/components/StatsCards'
import FormButton from '@/components/form-button'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'

function  Home() {
  return (
    <div className="container p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator  className='my-6'/>
      <h1 className='text-bold text-2xl col-span-2'>Your form</h1>
      <Separator  className='my-6'/>
      <FormButton />
      
    </div>
  )
}

export default Home