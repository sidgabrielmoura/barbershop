import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { Check, ChevronLeft, Menu, Smartphone, Star, StarIcon } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import ServiceItem from "@/components/serviceItem";
import Footer from "@/components/footer";
import SheetTriggerComponent from "@/components/sheetTrigger";
import PhoneComponent from "@/components/phoneItem";
import StarsComponent from "@/components/barbershop/stars";

export default async function BarbershopPage({ params }: any) {
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
                    <div
                        className="w-full h-[250px] bg-contain bg-fixed bg-no-repeat"
                        style={{
                            backgroundImage: `url(${barbershop?.imageUrl || ''})`,
                        }}
                    />

                    <div className="w-full flex items-center justify-between px-3 absolute top-5">
                        <Link href={'/'}>
                            <Button size={'icon'} variant={'outline'} className="size-10">
                                <ChevronLeft />
                            </Button>
                        </Link>
                        <SheetTriggerComponent />
                    </div>
                </section>

                <section className="px-5 mt-6">
                    <h1 className="text-2xl font-medium">{barbershop?.name}</h1>
                    <div>
                        <div className="flex items-center gap-2 mt-2">
                            <IoLocationSharp className="size-5 text-violet-500" />
                            <span className="text-md text-zinc-300">{barbershop?.address}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Star className="size-5 text-violet-500 fill-violet-500" />
                            <span className="text-md text-zinc-300">5,0 (459 avaliações)</span>
                        </div>
                    </div>

                    <StarsComponent/>
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6" />

                <section className="px-6 mt-6">
                    <h2 className="text-md text-muted-foreground uppercase">Sobre nós</h2>

                    <p className="text-md text-zinc-300 mt-2">
                        {barbershop?.description || ''}
                    </p>
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6" />

                <section className="px-6 mt-6 space-y-5">
                    <h2 className="text-md text-muted-foreground uppercase">Serviços</h2>

                    {barbershop?.services.map((service: any) => (
                        <ServiceItem key={service.id} service={service} barbershop={barbershop} />
                    ))}
                </section>

                <div className="w-full h-[0.08px] bg-zinc-600/40 mt-6" />

                <section className="px-6 py-4 space-y-3">
                    {barbershop?.phones.map((phone, index) => (
                        <PhoneComponent phone={phone} key={index} />
                    ))}
                </section>
            </main>
        </>
    )
}