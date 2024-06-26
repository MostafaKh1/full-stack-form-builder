"use server"

import { FormSchemaType, buttonFormSchema } from "@/dto/form"
import prisma from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

class UserNotFound extends Error {}


export async function getFormStats() {
    const user = await currentUser()

    if (!user) {
    throw new UserNotFound()
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0

    let submissionsRat = 0

    if (visits > 0) {
        submissionsRat = (submissions / visits) * 100;
    }
    const bounceRate = 100 - submissionsRat;

    return {
        visits,submissions,submissionsRat,bounceRate
    }
}



export async function CreateForm(data: FormSchemaType) {
    const validation = buttonFormSchema.safeParse(data)
    if (!validation.success) {
        throw new Error('form not valid')
    }
    const user =  await currentUser()

    if (!user) {
        throw new UserNotFound()
    }
    const {name,description} = data

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    }) 

    if (!form) {
        throw new Error("something went wrong")
    }

    return  (await form).id
}


 export async function getForms() {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFound()
    }

    const data = prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createAt: "desc"
        }
    })

    return data
} 


export async function getFromById(id: number) {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFound()
    }
    const form = await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })

    return form
}

export async function updateFormContent(id: number, formContent: string) {
    const user = await currentUser()

    if (!user) {
        throw new UserNotFound()
    }

    return prisma.form.update({
        where: {
            userId: user.id,
            id
        },
        data: {
        content: formContent
       }
    })
}

export async function publishedFrom(id: number) {
    const user = await currentUser()
    
    if (!user) {
        throw new UserNotFound()
    }

    return prisma.form.update({
        where: {
            userId: user.id,
            id
        },
        data: {
            published: true
        }
    })
}

export async function GetFormContentByUrl(formUrl: string) {


    return prisma.form.update({
        select: {
           content: true
        },
        where: {
            shareURL: formUrl
        },
        data: {
            visits: {
                increment: 1
            }
        }

    })

}

export async function SubmitForm(formUrl: string, content: string) {
    return prisma.form.update({

        where: {
            shareURL: formUrl,
            published: true
        },
        data: {
            submissions: {
                increment: 1
            },
            fromSub: {
                create: {
                    content: content
                }
            }
           
        },
    
    })
}