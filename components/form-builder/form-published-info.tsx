"use clint";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import Confetti from "react-confetti";

type FormPublishedType = {
  shareUrl: string;
  fromId: number;
};

function FormPublishedInfo({ shareUrl, fromId }: FormPublishedType) {
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={888}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-3xl font-bold text-primary border-b pb-2 mb-10">
            🎊🎊 Form Published 🎊🎊
          </h1>
          <h2 className="text-xl">Share this form</h2>
          <h3 className="text-md text-muted-foreground border-b pb-10">
            Anyone with the link can view and submit the form
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "Copied",
                  description: "Link copied ",
                });
              }}
            >
              Copy Link
            </Button>
          </div>
          <div className="flex justify-between items-center m-0">
            <Button variant={"link"} className="px-0" asChild>
              <Link href={"/"} className="gap-2">
                <MoveLeft />
                back to home
              </Link>
            </Button>
            <Button variant={"link"} className="px-0" asChild>
              <Link href={`/form/${fromId}`} className="gap-2">
                from details
                <MoveRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPublishedInfo;
