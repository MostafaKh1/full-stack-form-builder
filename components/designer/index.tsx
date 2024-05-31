import React, { useState } from "react";
import DesignerSidebar from "./designer-sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { FormElements, ElementsType } from "./form-elements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "./designer-element-wrapper";

function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
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
      const isDroppingOverArea = over.data?.current?.isDesignerDropArea;

      if (isDesignerBtnElement && isDroppingOverArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }

      console.log("over", over);
      const isDroppingOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf |
        isDroppingOverDesignerElementBottomHalf;

      const droppingSideBarOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSideBarOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }
        let indexElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexElement = overElementIndex + 1;
        }
        addElement(indexElement, newElement);
        return;
      }
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const isDraggingOverDesignerElementOverAnotherElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (isDraggingOverDesignerElementOverAnotherElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (ele) => ele.id === activeId
        );
        const overElementIndex = elements.findIndex((ele) => ele.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }
        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexNewElement = overElementIndex + 1;
        }

        addElement(indexNewElement, activeElement);
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
