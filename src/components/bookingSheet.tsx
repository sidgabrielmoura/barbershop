'use client'
import { Barbershop, BarbershopService } from "@/generated/prisma";
import { SheetContent } from "./ui/sheet";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PhoneComponent from "./phoneItem";
import { Button } from "./ui/button";

interface BookingInfInterface {
    service: BarbershopService,
    barbershop: Barbershop,
    confirmed: boolean
    date: string
}
export default function BookingSheet({ service, barbershop, confirmed, date }: BookingInfInterface) {
    const [dateFormat, setDateFormat] = useState<[day: string, month: string, hour: string]>()

    useEffect(() => {
        if (!date) return;

        const dateObj = new Date(date);

        const day = format(dateObj, "dd", { locale: ptBR });
        const month = format(dateObj, "MMMM", { locale: ptBR });
        const hour = format(dateObj, "HH:mm");

        setDateFormat([day, month, hour]);
    }, [date])

    return (
        <main className="mt-5">
            <div>
                <section className="w-full flex items-center justify-center relative">
                    <Image src={'/maps.png'} alt="mapa" width={100} height={100} className="w-full rounded-lg h-[180px]" />
                    <div className="w-[92%] py-3 px-4 rounded-lg bg-zinc-900 absolute bottom-3 flex gap-3 items-center">
                        <Image src={barbershop.imageUrl} alt={barbershop.name} width={20} height={20} className="size-10 rounded-full" />
                        <div className="-space-y-1">
                            <h1 className="font-bold">{barbershop.name}</h1>
                            <p className="text-sm font-light truncate">{barbershop.address}</p>
                        </div>
                    </div>
                </section>

                <section className="mt-4 flex flex-col gap-4">
                    <span className={`px-3 py-1 w-fit rounded-full bg-gradient-to-br font-bold text-sm ${confirmed ? 'from-violet-600/50 via-violet-500/60 to-violet-600/50 text-violet-400' : 'from-zinc-600/50 via-zinc-500/60 to-zinc-600/50 text-zinc-400'}`}>
                        {confirmed ? 'Confirmado' : 'Finalizado'}
                    </span>

                    <Card className="text-white rounded-xl shadow-sm">
                        <CardContent className="p-3">
                            <div className="flex justify-between items-start">
                                <h2 className="text-lg font-semibold">{service.name}</h2>
                                <span className="text-lg font-semibold">R$ {Number(service.price)},00</span>
                            </div>

                            <div className="mt-4 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Data</span>
                                    <span>{dateFormat?.[0]} de {dateFormat?.[1]}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Horário</span>
                                    <span>{dateFormat?.[2]}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Barbearia</span>
                                    <span>{barbershop.name}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {barbershop?.phones.map((phone, index) => (
                        <PhoneComponent phone={phone} key={index} />
                    ))}
                </section>
            </div>
        </main>
    )
}