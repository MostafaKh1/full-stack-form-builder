import React from "react";
import FromElementSidebar from "./form-element-sidebar";
import useDesigner from "./hooks/useDesigner";
import PropertiesElement from "./properties-element";

function DesignerSidebar() {
  const {selectedElement} = useDesigner()
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow bg-background gap-2 border-l-2 border-muted p-4 overflow-y-auto h-full">
      {!selectedElement ? <FromElementSidebar /> : <PropertiesElement />}
    </aside>
  );
}

export default DesignerSidebar;
