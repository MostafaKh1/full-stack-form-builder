"use clint";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { publishedFrom, updateFormContent } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useDesigner from "../designer/hooks/useDesigner";

function PublishedBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();
  const router = useRouter();
  async function PublishedForm() {
    try {
      const jsonElement = JSON.stringify(elements);
      await updateFormContent(id, jsonElement);
      await publishedFrom(id);
      toast({
        title: "Success",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-sky-500 text-white">
          Published
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Publishing this form will make it public and allow submissions. This
            action cannot be undone.{" "}
          </AlertDialogDescription>
          <span className="font-md">
            Publishing this form will make it public and you can collect
            submissions.{" "}
          </span>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              startTransition(PublishedForm);
            }}
          >
            Proceed {loading && <ReloadIcon className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishedBtn;
