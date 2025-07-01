import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/prisma"
import Image from "next/image"
import { Search, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import SearchComponent from "@/components/search"

interface BarbershopSearchProps {
    searchParams: {
        search?: string
    }
}

export default async function BarbershopPage({ searchParams }: BarbershopSearchProps) {
    const barbershop = await db.barbershop.findMany({
        where: {
            OR: [
                {name: {
                        contains: searchParams.search,
                        mode: "insensitive"
                }},
                {services: {
                    some: {
                        name: {
                            contains: searchParams.search,
                            mode: "insensitive"
                        }
                    }
                }}
            ]
        }
    })

    return (
        <>
            <section className="p-1 min-h-full space-y-4">
                <Navbar />

                <section className="px-3 space-y-3">
                    <SearchComponent />

                    <h1 className="text-muted-foreground pl-1 uppercase">resultados para "{searchParams.search}"</h1>

                    <div className="grid grid-cols-2 gap-1">
                        {barbershop.map((barber, index) => (
                            <div key={index} className="w-full flex flex-col gap-3 p-2 relative rounded-2xl bg-zinc-950/60 justify-between items-center mb-2">
                                <Badge className="gap-1 bg-violet-900/80 rounded-full p-1 absolute top-3 left-3"><Star className="size-4 fill-violet-400 text-violet-400" /> 5,0</Badge>
                                <Image
                                    alt={barber.name}
                                    src={`${barber.imageUrl}`}
                                    width={50}
                                    height={100}
                                    className="w-full h-fit object-cover rounded-lg"
                                />
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-lg text-nowrap truncate">{barber.name}</h1>
                                        <span className="text-xs text-zinc-500 truncate text-nowrap">{barber.address}</span>
                                    </div>
                                    <Link href={`/barbershops/${barber.id}`} className="w-full">
                                        <Button variant={'secondary'} size={'sm'} className="rounded-xl w-full">
                                            Reservar
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </>
    )
}