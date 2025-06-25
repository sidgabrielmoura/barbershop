import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarbershopInterface } from "@/interfaces";
import { db } from "@/lib/prisma";
import { Search, Star } from "lucide-react";
import { GiBeard, GiRazor } from "react-icons/gi";
import { FaScissors } from "react-icons/fa6";
import { FaHandSparkles } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Image from "next/image";

export default async function Home() {

  const services = [
    { name: 'cabelo', icon: <FaScissors /> },
    { name: 'barba', icon: <GiBeard /> },
    { name: 'acabamento', icon: <GiRazor /> },
    { name: 'massagem', icon: <FaHandSparkles /> },
    { name: 'estética', icon: <HiSparkles /> },
  ]

  const barbershop = await db.barbershop.findMany({})
  console.log(barbershop)

  return (
    <main className="p-1 flex flex-col gap-2">
      <Navbar />
      <section className="px-4">
        <div className="py-3 -space-y-1">
          <h1 className="font-bold text-[24px]">
            <span className="font-light">Olá</span>, faça seu login!
          </h1>
          <h1 className="text-[15px] text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}.
          </h1>
        </div>

        <div className="flex-col flex items-center justify-between w-full gap-1 mt-6">
          <div className="flex items-center gap-1 w-full">
            <Input type="search" placeholder="Faça sua busca..." className="outline-none flex-1 text-sm" />
            <Button size={'icon'} variant={'default'}>
              <Search />
            </Button>
          </div>

          <div className="w-full flex items-center justify-between mt-2 gap-1 overflow-x-auto">
            {services.map((service, index) => (
              <Card key={index} className="w-full flex justify-center items-center rounded-sm">
                <CardContent className="px-5 py-3 max-h-10 flex justify-center items-center gap-1">
                  <span className="">
                    {service.icon}
                  </span>
                  <span className="text-xs font-semibold">{service.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <Image alt="" src={'/Banner.svg'} width={200} height={20} className="w-full max-w-lg" />
        </div>

        <div className="w-full flex flex-col justify-between mt-4 gap-5">
          <h1 className="uppercase text-sm font-bold text-zinc-500">Agendamentos</h1>

          <Card>
            <CardContent className="flex justify-between py-4 px-0">
              <section className="flex w-[500px] flex-col gap-2 border-r-[.5px] border-zinc-600 px-4">
                <span className="px-3 py-1 w-fit rounded-full bg-gradient-to-br from-violet-600/50 via-violet-500/60 to-violet-600/50 text-violet-400 font-bold text-sm">
                  Confirmado
                </span>
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-zinc-400 rounded-full" />
                  <div className="flex flex-col -space-y-2">
                    <h1 className="font-bold text-lg">Corte de cabelo</h1>
                    <h1 className="font-thin text-lg">Barber vintage</h1>
                  </div>
                </div>
              </section>
              <section className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold text-zinc-500">
                  {new Date().toLocaleDateString("pt-BR", {
                    month: "long",
                  })}
                </h1>
                <h1 className="text-3xl font-light text-zinc-50 -tracking-[1px]">
                  {new Date().toLocaleDateString("pt-BR", {
                    day: "2-digit",
                  })}
                </h1>
                <h1 className="text-xl font-bold text-zinc-500">
                  {new Date().toLocaleTimeString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h1>
              </section>
            </CardContent>
          </Card>
        </div>

        <div className="w-full flex flex-col justify-between mt-4 gap-5">
          <h1 className="uppercase text-sm font-bold text-zinc-500">Recomendados</h1>

          <div className="flex gap-2 overflow-x-auto">
            {barbershop.map((barber, index) => (
              <div key={index} className="w-full min-w-[200px] flex flex-col gap-3 p-2 relative rounded-2xl bg-zinc-950/60 justify-between items-center mb-2">
                <Badge className="gap-1 bg-violet-900/80 rounded-full p-1 absolute top-3 left-3"><Star className="size-4 fill-violet-400 text-violet-400"/> 5,0</Badge>
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
                  <Button variant={'secondary'} size={'sm'} className="rounded-xl">Reservar</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col justify-between mt-4 gap-5">
          <h1 className="uppercase text-sm font-bold text-zinc-500">Populares</h1>

          <div className="flex gap-2 overflow-x-auto">
            {barbershop.map((barber, index) => (
              <div key={index} className="w-full min-w-[200px] flex flex-col gap-3 p-2 relative rounded-2xl bg-zinc-950/60 justify-between items-center mb-2">
                <Badge className="gap-1 bg-violet-900/80 rounded-full p-1 absolute top-3 left-3"><Star className="size-4 fill-violet-400 text-violet-400"/> 5,0</Badge>
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
                  <Button variant={'secondary'} size={'sm'} className="rounded-xl">Reservar</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex items-center justify-center mt-4 py-10 bg-zinc-800/40 text-zinc-400">
          <p>© 2023 Copyright <span className="font-bold">FSW Barber</span></p>
      </div>
    </main>
  )
}