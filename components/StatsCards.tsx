import { getFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { ScanText } from "lucide-react";
import { ScanSearch } from "lucide-react";
import { Activity } from "lucide-react";
import { Waypoints } from "lucide-react";

import { ReactNode } from "react";

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
}

interface StatsCardProps {
  title: string;
  icon?: ReactNode;
  text: string;
  value: string;
  loading: boolean;
  className: string;
}

async function CardStatsWrapper() {
  const stats = await getFormStats();
  return <StatsCards loading={false} data={stats} />;
}

export function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  console.log(data);
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-s md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<ScanSearch className="text-green-600" />}
        text="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Total submissions"
        icon={<ScanText className="text-blue-600" />}
        text="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions rat"
        icon={<Activity className="text-red-600" />}
        text="All time form submissions rat"
        value={data?.submissionsRat.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
      <StatsCard
        title="Total bounce rate"
        icon={<Waypoints className="text-violet-600" />}
        text="All time form bounce rate"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-violet-600"
      />
    </div>
  );
}

export function StatsCard({
  text,
  title,
  className,
  loading,
  icon,
  value,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
          <p className="text-sm text-muted-foreground pt-1">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardStatsWrapper;
