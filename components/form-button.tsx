'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";


import { FormSchemaType, buttonFormSchema } from '@/dto/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { CreateForm } from '@/actions/form';



function FormButton() {
  const createForm = useForm<FormSchemaType>({
    resolver: zodResolver(buttonFormSchema)
  })

  async function onSubmit(values:FormSchemaType ) {
    try {
      const formID  = await CreateForm(values)
      toast({
        title: 'Success',
        description: "form created successfully"
      })
       console.log('formId' , formID)    
    } catch (error) {
        toast({
          title: "Error",
          description: "Error while creating new Form"
        })
    }
  }






  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Create new Form</Button>
        </DialogTrigger>
       <DialogContent>
       <DialogHeader>
            <DialogTitle>Create Form</DialogTitle>
            <DialogDescription>create new Form and collecting responses</DialogDescription>
        </DialogHeader>
        <Form {...createForm}>
      <form onSubmit={createForm.handleSubmit(onSubmit)}>
        <FormField
        control={createForm.control}
        name="name"
        render={({field}) => (
          <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>   
  )}
        />
        <FormField
        control={createForm.control}
        name="description"
        render={({field}) => (
          <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...field}  rows={6}/>
          </FormControl>
        </FormItem>   
  )}
        />
       <DialogFooter>
        <Button  type='submit' disabled={createForm.formState.isSubmitting} className='mt-4 w-full'>save</Button>
       </DialogFooter>
      </form>
        </Form>
       </DialogContent>
    </Dialog>
  )
}

export default FormButton