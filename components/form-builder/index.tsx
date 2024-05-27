"use client";
import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./preview-dialog-btn";
import SaveFileBtn from "./save-file-btn";
import PublishedBtn from "./published-btn";
import Designer from "../designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../designer/drag-overlay-wrapper";

function FormBuilder({ form }: { form: Form }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center ">
          <h2 className="truncate  font-medium ">
            <span className="text-muted-foreground mr-2">
              Form: {form.name}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFileBtn />
                <PublishedBtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-1 items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
