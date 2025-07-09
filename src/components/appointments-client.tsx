'use client'

import { useSession } from "next-auth/react";
import Appointments from "./appointments";
import { Barbershop, Prisma } from "@/generated/prisma";
import { useEffect, useState } from "react";
import getAppointments from "@/app/actions/getAppointments";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Recommended from "./recommended";
import { Card, CardContent } from "./ui/card";

interface BarbershopInterface {
    barbershop: Barbershop[]
}
export default function AppointmentsClient({ barbershop }: BarbershopInterface) {
    const path = usePathname()
    const { data } = useSession();
    const [userAppointments, setUserAppointments] = useState<Prisma.BookingGetPayload<{ include: { service: { include: { barbershop: true } } } }>[]>([]);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            if (data?.user) {
                const res = await getAppointments((data.user as any).id);
                setUserAppointments(res);
            }
        };

        load();
    }, [data?.user])

    return (
        <>
            {path !== '/' ? (
                <>
                    {userAppointments.map((booking, index) => <Appointments key={index} booking={booking} />)}

                    {!userAppointments.length && (
                        <div className="mt-3">
                            <Card>
                                <CardContent className="flex justify-center items-center py-4 px-0 min-h-28 animate-pulse">
                                    <h1>Sem agendamentos</h1>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <section>
                        <h1 className="uppercase text-sm font-bold text-zinc-500 mt-3">Encontre mais barbearias</h1>
                        <Recommended barbershop={barbershop} grid />
                    </section>
                </>
            ) : (
                <>
                    {userAppointments.length > 0 && data?.user && (
                        <>
                            <h1 className="uppercase text-sm font-bold text-zinc-500 mt-5">Agendamentos</h1>
                            <Link href={'/bookings'}>
                                <Appointments booking={userAppointments[0]} />
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    )
}