import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./form-elemts";

function PropertiesElement() {
  const { selectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        <PropertiesForm />
      </div>
    </div>
  );
}

export default PropertiesElement;
