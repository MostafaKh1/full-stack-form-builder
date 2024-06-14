import React from "react";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import useDesigner from "../designer/hooks/useDesigner";
import { FormElements } from "../designer/form-elements";

function PreviewDialogBtn() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex gap-2">
          <EyeIcon />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0  border-b ">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold  text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is Form will be look like..
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 p-4 flex-grow bg-background h-full w-full rounded-2xl overflow-y-auto">
            {elements.map((ele) => {
              const FormComponent = FormElements[ele.type].formComponent;

              return <FormComponent key={ele.id} elementInstance={ele} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
