import Navbar from "@/components/navbar";
import { db } from "@/lib/prisma";
import Image from "next/image";
import SearchComponent from "@/components/search";
import Recommended from "@/components/recommended";
import Populars from "@/components/populars";
import WellcomeComponent from "@/components/wellcome";
import AppointmentsClient from "@/components/appointments-client";
import { Suspense } from "react";

export default async function Home() {

  const barbershop = await db.barbershop.findMany({})

  return (
    <main className="p-1 flex flex-col gap-2">
      <Suspense fallback={<div>Carregando...</div>}>
        <Navbar />
      </Suspense>
      <section className="px-4">
        <WellcomeComponent />

        {/* Barra de pesquisa e Pesquisa rápida */}
        <Suspense fallback={<div>Carregando...</div>}>
          <SearchComponent />
        </Suspense>

        <div className="w-full flex justify-center items-center mt-4">
          <Image alt="" src={'/Banner.svg'} width={200} height={20} className="w-full max-w-lg" />
        </div>

        {/* Agendamentos */}
        <Suspense fallback={<div>Carregando...</div>}>
          <AppointmentsClient barbershop={barbershop} />
        </Suspense>

        {/* Recomendados */}
        <h1 className="uppercase text-sm font-bold text-zinc-500 mt-4">Recomendados</h1>
        <Recommended barbershop={barbershop} grid={false} />

        {/* Populares */}
        <Populars barbershop={barbershop} />

      </section>
    </main>
  )
}