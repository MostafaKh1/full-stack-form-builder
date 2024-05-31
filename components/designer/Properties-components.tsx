import React, { useEffect } from "react";
import { FormElementsInstance } from "./form-elements";
import { CustomInstance } from "../fields/text-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { propertiesSchema } from "@/dto/properties";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "./hooks/useDesigner";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

export default function PropertiesComponents({
  elementInstance,
}: {
  elementInstance: FormElementsInstance;
}) {
  type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

  const element = elementInstance as CustomInstance;
  const { updatedElement } = useDesigner();
  const propsForm = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      placeholder: element.extraAttributes.placeholder,
      require: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    propsForm.reset(element.extraAttributes);
  }, [element, propsForm]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { helperText, label, placeholder, require } = values;
    updatedElement(element.id, {
      ...element,
      extraAttributes: {
        helperText,
        label,
        placeholder,
        require,
      },
    });
  }

  return (
    <Form {...propsForm}>
      <form
        onBlur={propsForm.handleSubmit(applyChanges)}
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField
          control={propsForm.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The label of the filed </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={propsForm.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The Helper Text of the filed </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={propsForm.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The Placeholder of the filed </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={propsForm.control}
          name="require"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel>Require</FormLabel>
              <FormDescription>The require of the filed </FormDescription>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
