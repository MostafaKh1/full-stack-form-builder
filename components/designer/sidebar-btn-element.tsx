import React from 'react'
import { FormElement } from './form-elemts'
import { Button } from '../ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

function SideBarBtnElement({formElement}: {formElement: FormElement}) {
    const {icon,label} = formElement.designerBtnElement
    const draggable = useDraggable({
      id: `designer-btn-${formElement.type}`,
      data: {
        type: formElement.type,
        isDesignerBtnElement: true
      },


    })
  return (
   <Button
   ref={draggable.setNodeRef}
    variant={'outline'}
    className={cn('flex justify-center flex-col  h-[120px] w-[120px]',
    draggable.isDragging && "ring-2 ring-primary"

    )}
    {...draggable.listeners}
    {...draggable.attributes}
   >
    {icon}
    <p>{label}</p>

   </Button>
  )
}

export function SideBarBtnElementDragOverlay({formElement}: {formElement: FormElement}) {
  const {icon,label} = formElement.designerBtnElement

return (
 <Button

  variant={'outline'}
  className='flex justify-center flex-col  h-[120px] w-[120px]'
  

  
 >
  {icon}
  <p>{label}</p>

 </Button>
)
}


export default SideBarBtnElement