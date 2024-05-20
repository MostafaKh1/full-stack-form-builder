import React from 'react'
import SideBarBtnElement from './sidebar-btn-element'
import { FormElements } from './form-elemts'

function DesignerSidebar() {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow bg-background gap-2 border-l-2 border-muted p-4 overflow-y-auto h-full'>

    Elements
    <SideBarBtnElement formElement={FormElements.TextField} />
    </aside>
  )
}

export default DesignerSidebar