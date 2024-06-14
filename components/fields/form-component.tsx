import React, { useEffect, useState } from "react";

import { CustomInstance, TextFieldFormElement } from "./text-field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormElementsInstance, SubmitValues } from "../designer/form-elements";
import { cn } from "@/lib/utils";

function FormComponent({
  elementInstance,
  submitValues,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementsInstance;
  submitValues?: SubmitValues;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && " text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onBlur={(e) => {
          if (!submitValues) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValues(element.id, e.target.value);
        }}
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-sm",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default FormComponent;

[
  {
    id: "9071",
    type: "TextField",
    extraAttributes: {
      helperText: "Helper Text",
      label: "name vliad pls",
      placeholder: "Enter Value..",
      require: true,
    },
  },
  {
    id: "4103",
    type: "TextField",
    extraAttributes: {
      helperText: "Helper Text",
      label: "testtt",
      placeholder: "Enter Value..",
      require: true,
    },
  },
];
