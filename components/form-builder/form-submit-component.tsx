"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElements, FormElementsInstance } from "../designer/form-elements";
import { Button } from "../ui/button";
import { MousePointerClick } from "lucide-react";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SubmitForm } from "@/actions/form";

interface FormSubmitComponent {
  formUrl: string;
  formContent: FormElementsInstance[];
}

function FormSubmitComponent({ formUrl, formContent }: FormSubmitComponent) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();

  const submitValues = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const validateForm: () => boolean = useCallback(() => {
    for (const filed of formContent) {
      const actualValue = formValues.current[filed.id] || "";
      const valid = FormElements[filed.type].validate(filed, actualValue);
      if (!valid) {
        formErrors.current[filed.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [formContent]);

  const formSubmit = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check form error",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    console.log("values", formValues.current);
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-sky-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8 ">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-g-background w-full p-8 overflow-y-auto border shadow-xl shadow-sky-700 rounded"
      >
        {formContent.map((element) => {
          const FormElementComponent = FormElements[element.type].formComponent;
          return (
            <FormElementComponent
              key={element.id}
              elementInstance={element}
              submitValues={submitValues}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 gap-2"
          onClick={() => {
            startTransition(formSubmit);
          }}
          disabled={loading}
        >
          {!loading && (
            <>
              <MousePointerClick className="h-5 w-5" />
              Submit
            </>
          )}
          {loading && <ReloadIcon className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
