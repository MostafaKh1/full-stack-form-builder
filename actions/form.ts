"use server"

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
        submissionsRat = (submissions / visits) * 100
    }
    const bounceRate  =  100 - submissionsRat

    return {
        visits,submissions,submissionsRat,bounceRate
    }
}