import Navbar from "@/components/navbar";
import { db } from "@/lib/prisma";
import AppointmentsClient from "@/components/appointments-client";

export default async function BookingsPage() {
    const barbershop = await db.barbershop.findMany({})

    return (
        <>
            <main className="min-h-screen p-1">
                <Navbar />

                <section className="mt-4 px-3">
                    <h1 className="uppercase text-sm font-bold text-zinc-500">Agendamentos</h1>
                    <AppointmentsClient barbershop={barbershop}/>
                </section>
            </main>
        </>
    )
}