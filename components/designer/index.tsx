import React, { useState } from "react";
import DesignerSidebar from "./designer-sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { FormElements, ElementsType } from "./form-elemts";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "./designer-element-wrapper";

function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  console.log("elements", elements);

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(0, newElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        ref={droppable.setNodeRef}
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto ",
            droppable.isOver && "ring-2 ring-primary/30"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop Here
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] bg-primary/50 rounded-md"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements.map((ele) => (
                <DesignerElementWrapper key={ele.id} element={ele} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
