import React, { useContext } from "react";
import { DesignerContext } from "../context/designer-context";

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used whit a DesignerContext");
  }

  return context;
}

export default useDesigner;
