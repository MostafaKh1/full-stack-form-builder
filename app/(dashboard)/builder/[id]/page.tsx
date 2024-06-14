import { getFromById } from '@/actions/form'
import FormBuilder from '@/components/form-builder'
import React from 'react'

async function BuilderPage({params} : {params: {
    id: string
}}) {

    
    const {id} = params

    const form = await getFromById(Number(id))

    if (!form) {
        throw new Error("Error!")
    }
    
  return (
    <FormBuilder form={form}  />
  )
}

export default BuilderPage