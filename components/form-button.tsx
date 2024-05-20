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
import { ReloadIcon } from '@radix-ui/react-icons';
import { FilePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';




function FormButton() {
  const router = useRouter()
  const createForm = useForm<FormSchemaType>({
    resolver: zodResolver(buttonFormSchema)
  })

  async function onSubmit(values:FormSchemaType ) {
    try {
      const formId  = await CreateForm(values)
      
      toast({
        title: 'Success',
        description: "form created successfully"
      })
      router.push(`/builder/${formId}`)
          
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
            <Button  variant="outline"className='flex  flex-col justify-center gap-4 group items-center border 0 h-[200px]  '>

            
            <FilePlus  className='h-12 w-12 group-hover:text-primary  text-gray-500 text-muted-foreground'/>
            <p className='text-base text-gray-500 group-hover:text-primary  '>Create new form</p>
            </Button>
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
       {!createForm.formState.isSubmitting ?   <Button  type='submit' disabled={createForm.formState.isSubmitting} className='mt-4 w-full'>save</Button> :  <Button className='w-full mt-4' disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> }
      
           </DialogFooter>
      </form>
        </Form>
       </DialogContent>
    </Dialog>
  )
}

export default FormButton