"use client";

import PropertiesComponents from "../designer/Properties-components";
import DesignerComponent from "../designer/designer-component";
import {
  ElementsType,
  FormElement,
  FormElementsInstance,
} from "../designer/form-elements";
import { Type } from "lucide-react";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Filed",
  helperText: "Helper Text",
  required: false,
  placeholder: "Enter Value..",
};

export type CustomInstance = FormElementsInstance & {
  extraAttributes: typeof extraAttributes;
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: <Type />,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>form</div>,
  propertiesComponent: PropertiesComponents,
};
