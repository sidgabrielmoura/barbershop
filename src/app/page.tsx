import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {

  const services = [
    { name: 'cabelo' },
    { name: 'barba' },
    { name: 'acabamento' },
    { name: 'massagem' },
    { name: 'estética' },
  ]

  return (
    <main className="p-1 flex flex-col gap-1">
      <Navbar />
      <section className="px-4">
        <div className="py-3 -space-y-1">
          <h1 className="font-bold">
            <span className="text-[24px] font-light">Olá</span>, faça seu login!
          </h1>
          <h1 className="text-[15px] text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}.
          </h1>
        </div>

        <div className="flex-col flex items-center justify-between w-full gap-1">
          <div className="flex items-center gap-1 w-full">
            <Input type="search" placeholder="Faça sua busca..." className="outline-none flex-1 text-sm" />
            <Button size={'icon'} variant={'default'}>
              <Search />
            </Button>
          </div>

          <div className="w-full flex items-center justify-between mt-2 gap-1 overflow-x-auto">
            {services.map((service, index) => (
              <Card key={index} className="w-full flex justify-center items-center rounded-sm">
                <CardContent className="px-5 py-1">
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
          <h1>Agendamentos</h1>

          <Card>
            <CardContent className="flex justify-between py-4 px-0">
              <section className="flex w-[500px] flex-col gap-2 border-r-[.5px] border-zinc-300 px-4">
                <span className="px-3 py-1 w-[105px] rounded-full bg-gradient-to-br from-violet-600/50 via-violet-500/60 to-violet-600/50 text-violet-400 font-bold text-sm">
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
      </section>
    </main>
  )
}