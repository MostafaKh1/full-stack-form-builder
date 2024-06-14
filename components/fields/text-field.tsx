"use client";

import PropertiesComponents from "./Properties-components";
import {
  ElementsType,
  FormElement,
  FormElementsInstance,
} from "../designer/form-elements";
import { Type } from "lucide-react";
import FormComponent from "./form-component";
import DesignerComponent from "./designer-component";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Label Value",
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
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponents,
  validate: (
    formElement: FormElementsInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};
