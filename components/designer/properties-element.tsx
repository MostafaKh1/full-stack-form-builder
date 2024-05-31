import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./form-elements";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function PropertiesElement() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  console.log(selectedElement);
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70 ">Elements Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4 mt-2" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesElement;
