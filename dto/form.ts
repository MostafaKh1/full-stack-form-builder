import { z } from "zod"

export const buttonFormSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional()
  })
  
  export type FormSchemaType = z.infer<typeof buttonFormSchema>