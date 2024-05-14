
import CardStatsWrapper, { StatsCards } from '@/components/StatsCards'
import React, { Suspense } from 'react'

function    Home() {
  return (
    <div className="container p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>

    </div>
  )
}

export default Home