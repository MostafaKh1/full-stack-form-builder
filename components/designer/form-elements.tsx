import { ReactElement } from "react";
import { TextFieldFormElement } from "../fields/text-field";

export type ElementsType = "TextField";
export type SubmitValues = (key: string, value: string) => void;

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
  formComponent: React.FC<{
    elementInstance: FormElementsInstance;
    submitValues?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementsInstance;
  }>;

  validate: (
    fromElement: FormElementsInstance,
    currentValue: string
  ) => boolean;
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
