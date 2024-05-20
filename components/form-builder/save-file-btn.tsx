import React from 'react'
import { Button } from '../ui/button'
import { SaveIcon } from 'lucide-react'

function SaveFileBtn() {
  return (
    <Button className='gap-2' variant={"outline"}>
        <SaveIcon />
        Save
        </Button>
  )
}

export default SaveFileBtn