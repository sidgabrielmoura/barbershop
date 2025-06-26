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
import { QuickSearchServices } from "@/constants";
import SearchComponent from "@/components/search";
import Appointments from "@/components/appointments";
import Recommended from "@/components/recommended";
import Populars from "@/components/populars";
import Footer from "@/components/footer";

export default async function Home() {

  const barbershop = await db.barbershop.findMany({})

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

      <Footer/>
    </main>
  )
}