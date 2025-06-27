
import { BarbershopService } from "@/generated/prisma";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { X } from "lucide-react";
import BookingSectionClient from "./BookingSectionClient";

interface ServiceItemProps {
    service: BarbershopService;
    barbershopName: string
}
export default function ServiceItem({ service, barbershopName }: ServiceItemProps) {

    return (
        <Card>
            <CardContent className="py-3 px-2 flex gap-2">
                <Image src={service.imageUrl} alt={service.name} width={100} height={100} className="size-28 rounded-2xl" />
                <div className="flex flex-col justif{service.price.toFixed(2)}y-between">
                    <div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>

                    <div className="flex items-end justify-between">
                        <span className="text-lg font-bold text-violet-500/90">R$ {service.price.toFixed(2)}</span>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={'secondary'}>Reservar</Button>
                            </SheetTrigger>
                            <SheetContent className="px-0 flex flex-col justify-between overflow-y-auto">
                                <SheetHeader className="px-6">
                                    <div className="flex items-center justify-between w-full">
                                        <h1 className="font-bold">Fazer Reserva</h1>
                                        <SheetClose asChild>
                                            <Button size={"icon"} variant={"outline"} className="p-2">
                                                <X className="cursor-pointer" />
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </SheetHeader>

                                <div className="h-[0.1px] w-full bg-zinc-700/50" />

                                <BookingSectionClient service={service} barbershopName={barbershopName} />

                                <div className="px-3 pb-3 w-full">
                                    <Button variant={'default'} className="w-full">Confirmar</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}