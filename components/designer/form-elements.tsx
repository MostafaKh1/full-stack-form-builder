import { ReactElement } from "react";
import { TextFieldFormElement } from "../fields/text-field";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementsInstance;
  designerBtnElement: {
    icon: ReactElement;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementsInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};