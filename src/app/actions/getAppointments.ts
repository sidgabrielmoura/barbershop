"use server"

import { db } from "@/lib/prisma";

export default async function getAppointments(userId: string) {
    const appointments = await db.booking.findMany({
        where: { userId }
    });
    return appointments;
}