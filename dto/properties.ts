import { z } from "zod";

export const propertiesSchema = z.object({
    label: z.string().min(4).max(50),
    helperText: z.string().max(500),
    required: z.boolean().default(false),
    placeholder: z.string().max(50)
})
