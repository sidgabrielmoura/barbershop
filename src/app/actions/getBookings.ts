"use server"

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface BookingsInterface {
    barbershopId: string,
    date: Date
}

export const BookingsGetter = ({ date, barbershopId }: BookingsInterface) => {
    return db.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })
}