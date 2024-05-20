'use client'

import { ElementsType, FormElement } from "../designer/form-elemts"
import { Type } from 'lucide-react';



const type: ElementsType = "TextField"

export const TextFieldFormElement: FormElement =  {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text Filed",
            helperText: "Helper Text",
            required: false,
            placeholder: "Enter Value.."
        }
    }),
    designerBtnElement: {
        icon: <Type />,
        label: "Text Field"
    },
    designerComponent: () => <div>designer</div>,
    formComponent: () => <div>form</div>,
    propertiesComponent: () => <div>properties</div>,
    
    
}