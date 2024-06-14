"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { SaveIcon } from "lucide-react";
import useDesigner from "../designer/hooks/useDesigner";
import { updateFormContent } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function SaveFileBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();


  const updateContent = async () => {
    const jsonElement = JSON.stringify(elements);
    try {
      await updateFormContent(id, jsonElement);
      toast({
        title: "Success",
        description: "From Saved Successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      className="gap-2"
      variant={"outline"}
      disabled={loading}
      onClick={() => {
        startTransition(updateContent);
      }}
    >
      <SaveIcon />
      Save
      {loading && <ReloadIcon className="animate-spin" />}
    </Button>
  );
}

export default SaveFileBtn;
