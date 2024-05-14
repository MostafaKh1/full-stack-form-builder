import { getFormStats } from "@/actions/form"
import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"


interface StatsCardsProps {
    data?: Awaited<ReturnType<typeof getFormStats>>
    loading: boolean
}


interface StatsCardProps {
    title: string
    icon?: string
    text: string
    value: string
    loading: boolean
    className: string
} 

async function CardStatsWrapper() {
    const stats = await getFormStats()
    return <StatsCards loading={false} data={stats} />
}




export function StatsCards(props: StatsCardsProps)  {
    const {data , loading} = props
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-s md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
        title="Total visits"
        icon={""}
        text="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
        />
    </div>
  )
}




function StatsCard({text,title,className,loading,icon,value,}: StatsCardProps) {
 return (
    <Card className={className}>
    <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold">
            {
                loading && <Skeleton>
                    <span>0</span>
                </Skeleton>
            }
        </div>
    </CardContent>
</Card>
 )
}

export default CardStatsWrapper