import { GetFormContentByUrl } from "@/actions/form";
import FormSubmitComponent from "@/components/form-builder/form-submit-component";
import React from "react";

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("Url Not Found");
  }
  const formContent = JSON.parse(form.content);


  return (
    <FormSubmitComponent formUrl={params.formUrl} formContent={formContent} />
  );
}

export default SubmitPage;
