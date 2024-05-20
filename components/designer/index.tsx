import React from 'react'
import DesignerSidebar from './designer-sidebar'
import {useDroppable} from "@dnd-kit/core"
import { cn } from '@/lib/utils'


function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  })
  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'
      ref={droppable.setNodeRef}
      >
    <div   className={cn('bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto ',
      droppable.isOver && "ring-2 ring-primary/30"

    )}>
      {!droppable.isOver && <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop Here</p>}

      {droppable.isOver && (
        <div className='p-4 w-full'>
            <div className='h-[120px] bg-primary/50 rounded-md'></div>
        </div>
      )}
    </div>
      </div>
      <DesignerSidebar/>
    </div>
  )
}

export default Designer