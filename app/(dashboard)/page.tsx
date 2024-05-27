import CardStatsWrapper, { StatsCards } from "@/components/StatsCards";
import FormButton from "@/components/form-button";
import { FormCardSkeleton, FormCards } from "@/components/form-card/form-cards";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";

function Home() {
  return (
    <div className="container p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h1 className="text-bold text-2xl col-span-2">Your form</h1>
      <Separator className="my-6" />
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormButton />
        <Suspense
          fallback={[1, 2, 3].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
