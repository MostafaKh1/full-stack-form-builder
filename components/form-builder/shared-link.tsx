"use client";
import React from "react";
import useMounted from "./hooks/useMounted";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CopyIcon } from "lucide-react";

function ShareLink({ shareUrl }: { shareUrl: string }) {
  const { mounted } = useMounted();
  const urlLink = `${window.location.origin}/submit/${shareUrl}`;
  if (!mounted) return null;

  return (
    <div className="flex flex-grow  gap-4 items-center ">
      <Input readOnly value={urlLink} />
      <Button
        className="gap-2"
        onClick={() => {
          navigator.clipboard.writeText(urlLink);
        }}
      >
        Copy Link
        <CopyIcon />
      </Button>
    </div>
  );
}

export default ShareLink;
