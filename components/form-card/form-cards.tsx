import React from "react";
import { Skeleton } from "../ui/skeleton";
import { getForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Form } from "@prisma/client";
import { Badge } from "../ui/badge";
import { formatDistance } from "date-fns";
import { ScanSearch, ScanText, FilePenLine } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const FormCardSkeleton = () => {
  return <Skeleton className="border w-full h-[200px]" />;
};

export async function FormCards() {
  const forms = await getForms();

  return (
    <>
      {forms.map((form, i) => (
        <FormCard form={form} key={form.id} />
      ))}
    </>
  );
}

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardTitle className="flex items-center  mt-4 gap-2 justify-between">
        <span className="truncate font-bold ">{form.name}</span>
        {form.published ? (
          <Badge>Published</Badge>
        ) : (
          <Badge variant={"destructive"}>Draft</Badge>
        )}
      </CardTitle>
      <CardDescription className="flex  my-4   items-center justify-between  text-base font-semibold text-muted-foreground">
        {formatDistance(form.createAt, new Date(), {
          addSuffix: true,
        })}
        ,
        {form.published && (
          <span className="flex items-center gap-2 ">
            <ScanSearch className="text-muted-foreground" />
            <span>{form.visits.toLocaleString()}</span>
            <ScanText className="text-muted-foreground" />
            <span>{form.submissions.toLocaleString()}</span>
          </span>
        )}
      </CardDescription>
      <CardContent className="h-[20px] p-0 truncated text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button variant={"link"} className="w-full gap-4 flex flex-grow mt-8">
            <Link href={`/form/${form.id}`}> View submissions </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild className="w-full gap-4 flex flex-grow mt-8 ">
            <Link href={`/builder/${form.id}`}>
              {" "}
              Edit form <FilePenLine />{" "}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
