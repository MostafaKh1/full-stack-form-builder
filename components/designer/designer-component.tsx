import React from "react";
import { FormElementsInstance } from "./form-elemts";
import { CustomInstance } from "../fields/text-field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-lg">{helperText}</p>
      )}
    </div>
  );
}

export default DesignerComponent;
