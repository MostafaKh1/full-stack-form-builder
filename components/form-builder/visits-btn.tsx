"use client";

import React from "react";
import { Button } from "../ui/button";
import useMounted from "./hooks/useMounted";

function VisitsBtn({ shareUrl }: { shareUrl: string }) {
  const urlLink = `${window.location.origin}/submit/${shareUrl}`;
  const { mounted } = useMounted();

  if (!mounted) {
    return null;
  }
  return (
    <Button
      className="w-[200px] "
      onClick={() => {
        window.open(urlLink, "_blank");
      }}
    >
      Visits
    </Button>
  );
}

export default VisitsBtn;
