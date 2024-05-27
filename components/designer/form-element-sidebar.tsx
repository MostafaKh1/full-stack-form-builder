import React from "react";
import SideBarBtnElement from "./sidebar-btn-element";
import { FormElements } from "./form-elemts";
function FromElementSidebar() {
  return (
    <div>
      Elements
      <SideBarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FromElementSidebar;
