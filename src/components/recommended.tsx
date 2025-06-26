import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Barbershop } from "@/generated/prisma";

interface RecommendedProps {
    barbershop: Barbershop[];
}

export default function Recommended({ barbershop }: RecommendedProps) {
    return (
        <div className="w-full flex flex-col justify-between mt-4 gap-5">
            <h1 className="uppercase text-sm font-bold text-zinc-500">Recomendados</h1>

            <div className="flex gap-2 overflow-x-auto">
                {barbershop.map((barber, index) => (
                    <div key={index} className="w-full min-w-[200px] flex flex-col gap-3 p-2 relative rounded-2xl bg-zinc-950/60 justify-between items-center mb-2">
                        <Badge className="gap-1 bg-violet-900/80 rounded-full p-1 absolute top-3 left-3"><Star className="size-4 fill-violet-400 text-violet-400" /> 5,0</Badge>
                        <Image
                            alt={barber.name}
                            src={`${barber.imageUrl}`}
                            width={50}
                            height={150}
                            className="w-full h-fit object-cover rounded-lg"
                        />
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex flex-col">
                                <h1 className="font-bold text-lg text-nowrap truncate">{barber.name}</h1>
                                <span className="text-xs text-zinc-500 truncate text-nowrap">{barber.address}</span>
                            </div>
                            <Button variant={'secondary'} size={'sm'} className="rounded-xl">
                                <Link href={`/barbershops/${barber.id}`}>Reservar</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}