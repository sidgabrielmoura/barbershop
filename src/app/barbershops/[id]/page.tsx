import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeft, Menu, Smartphone, Star } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ServiceItem from "@/components/serviceItem";
import Footer from "@/components/footer";
import SheetTriggerComponent from "@/components/sheetTrigger";

export default async function BarbershopPage({ params }: any){
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    });

    return (
        <>
            <main>
                <section>
                    <Image 
                        src={barbershop?.imageUrl || ''} 
                        alt={barbershop?.name || ''} 
                        width={100} 
                        height={100}
                        className="w-full h-auto object-contain"
                    />

                    <div className="w-full flex items-center justify-between px-3 absolute top-5">
                        <Button size={'icon'} variant={'secondary'} className="size-10">
                            <Link href={'/'}><ChevronLeft/></Link>
                        </Button>
                        <SheetTriggerComponent/>
                    </div>
                </section>

                <section className="px-5 mt-6">
                    <h1 className="text-2xl font-medium">{barbershop?.name}</h1>
                    <div>
                        <div className="flex items-center gap-2 mt-2">
                            <IoLocationSharp className="size-5 text-violet-500"/>
                            <span className="text-md text-zinc-300">{barbershop?.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <Star className="size-5 text-violet-500 fill-violet-500"/>
                            <span className="text-md text-zinc-300">5,0 (459 avaliações)</span>
                        </div>
                    </div>
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6"/>

                <section className="px-6 mt-6">
                    <h2 className="text-md text-muted-foreground uppercase">Sobre nós</h2>

                    <p className="text-md text-zinc-300 mt-2">
                        {barbershop?.description || ''}
                    </p>
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6"/>

                <section className="px-6 mt-6 space-y-5">
                    <h2 className="text-md text-muted-foreground uppercase">Serviços</h2>

                    {barbershop?.services.map((service: any) => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6"/>

                <section className="px-6 mt-6 space-y-5 flex flex-col">
                    <h2 className="text-md text-muted-foreground uppercase">Contato</h2>

                    <div className="flex flex-col gap-2">
                        {barbershop?.phones.map((contact, index) => (
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <Smartphone/>
                                    {contact}
                                </div>
                                <Button variant={'outline'}>Copiar</Button>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer/>
            </main>
        </>
    )
}