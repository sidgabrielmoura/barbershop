import Navbar from "@/components/navbar";
import { db } from "@/lib/prisma";
import Image from "next/image";
import SearchComponent from "@/components/search";
import Appointments from "@/components/appointments";
import Recommended from "@/components/recommended";
import Populars from "@/components/populars";
import WellcomeComponent from "@/components/wellcome";

export default async function Home() {

  const barbershop = await db.barbershop.findMany({})

  return (
    <main className="p-1 flex flex-col gap-2">
      <Navbar />
      <section className="px-4">
        <WellcomeComponent/>

        {/* Barra de pesquisa e Pesquisa rápida */}
        <SearchComponent />

        <div className="w-full flex justify-center items-center mt-4">
          <Image alt="" src={'/Banner.svg'} width={200} height={20} className="w-full max-w-lg" />
        </div>

        {/* Agendamentos */}
        <Appointments/>

        {/* Recomendados */}
        <Recommended barbershop={barbershop} />

        {/* Populares */}
        <Populars barbershop={barbershop} />

      </section>
    </main>
  )
}