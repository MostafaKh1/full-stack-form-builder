import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SideBarBtnElementDragOverlay } from "./sidebar-btn-element";
import { ElementsType, FormElement, FormElements } from "./form-elemts";
import useDesigner from "./hooks/useDesigner";

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem?.data) return null;

  let node = <p>Testt</p>;
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />;
  }
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>element not Found</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type as ElementsType].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none" >
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
