"use server"

import { db } from "@/lib/prisma"

interface createBookingParam{
    userId: string
    serviceId: string
    date: Date
}
export default async function CreateBooking(params: createBookingParam) {
    const response = await db.booking.create({
        data: params
    })

    if(response) {
        return true
    }

    return false

}