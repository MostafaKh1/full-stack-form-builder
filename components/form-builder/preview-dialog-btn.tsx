import React from 'react'
import { Button } from '../ui/button'
import { EyeIcon } from 'lucide-react'

function PreviewDialogBtn() {
  return (
    <Button variant={'outline'} className='flex gap-2'>
        <EyeIcon />
        Preview
    </Button>
  )
  
}

export default PreviewDialogBtn