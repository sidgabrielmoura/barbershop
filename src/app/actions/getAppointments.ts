"use server"

import { db } from "@/lib/prisma"

export default async function getAppointments(userId: string) {
    const appointments = await db.booking.findMany({
        where: { userId }, 
        include: { service: {include: {barbershop: true}} }
    });
    return appointments;
}