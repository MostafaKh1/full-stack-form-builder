import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SideBarBtnElementDragOverlay } from './sidebar-btn-element'
import { ElementsType, FormElements } from './form-elemts'

function DragOverlayWrapper() {
    const [draggedItem,setDraggedItem] = useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active)
        },  
        onDragCancel:() =>  {
            setDraggedItem(null)
        },
        onDragEnd:() =>  {
            setDraggedItem(null)
        },
    })
    if (!draggedItem?.data) return null

    let node = <p>Testt</p>
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement
    
    if (isSidebarBtnElement) {
        const type = draggedItem.data.current?.type as ElementsType;
        node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />
    }
  return <DragOverlay>{node}</DragOverlay>
    
  
}

export default DragOverlayWrapper