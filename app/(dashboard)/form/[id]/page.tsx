import { getFromById } from "@/actions/form";
import { StatsCard, StatsCards } from "@/components/StatsCards";
import ShareLink from "@/components/form-builder/shared-link";
import SubmissionsTable from "@/components/form-builder/submitins-table";
import VisitsBtn from "@/components/form-builder/visits-btn";
import { Activity, ScanSearch, ScanText, Waypoints } from "lucide-react";
import React from "react";

async function FormDetailsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const form = await getFromById(Number(id));

  if (!form) {
    throw new Error("Error!");
  }

  const { visits, submissions } = form;

  let submissionsRat = 0;

  if (visits > 0) {
    submissionsRat = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionsRat;

  return (
    <>
      <div className="py-6  border-b border-muted  ">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitsBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <ShareLink shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full p-8 gap-8 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container ">
        <StatsCard
          title="Total visits"
          icon={<ScanSearch className="text-green-600" />}
          text="All time form visits"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Total submissions"
          icon={<ScanText className="text-blue-600" />}
          text="All time form submissions"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions rat"
          icon={<Activity className="text-red-600" />}
          text="All time form submissions rat"
          value={submissionsRat.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
        <StatsCard
          title="Total bounce rate"
          icon={<Waypoints className="text-violet-600" />}
          text="All time form bounce rate"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-violet-600"
        />
      </div>
      <SubmissionsTable id={form.id} />
    </>
  );
}

export default FormDetailsPage;
