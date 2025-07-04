'use client'

import { useEffect, useRef, useState } from "react"
import BookingCard from "./BookingCard"
import CalendarServiceComponent from "./CaledarService"
import BookingHoursComponent from "./BookingHours"
import Image from "next/image"
import CreateBooking from "@/app/actions/create-booking"
import { set } from "date-fns"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { SheetClose } from "./ui/sheet"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"

export default function BookingSectionClient({ service, barbershopName, user }: any) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [dateISO, setDateISO] = useState<string>("")
  const [selectedHour, setSelectedHour] = useState<string>("")
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const {data} = useSession()

  const handleCreateBooking = async () => {
    try {
      setLoading(true)
      if (!dateISO || !selectedDate || !selectedHour) return;

      const hour = selectedHour.split(':')[0];
      const minute = selectedHour.split(':')[1];

      const newDate = set(dateISO, {
        minutes: Number(minute),
        hours: Number(hour),
      });

      await CreateBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      });

      setLoading(false)
      toast.success("Reserva feita com sucesso!");

      setOpenDialog(true);

    } catch (error: any) {
      setLoading(false)
      toast.error("Erro ao criar reserva");
      console.error(error);
    }
  }

  return (
    <>
      <CalendarServiceComponent onDateSelect={setSelectedDate} dateISO={setDateISO} />
      <div className="h-[0.1px] w-full bg-zinc-700/50" />
      <BookingHoursComponent onHourSelect={setSelectedHour} />
      <div className="h-[0.1px] w-full bg-zinc-700/50" />
      <BookingCard
        service={service?.name}
        price={`R$ ${Number(service?.price ?? 0).toFixed(2)}`}
        barbershop={barbershopName}
        hour={selectedHour}
        dayMonth={selectedDate}
      />

      <div className="px-3 pb-3 w-full">
        <Button
          disabled={!selectedDate || !selectedHour || loading}
          onClick={handleCreateBooking}
          variant={'default'}
          className="w-full"
        >
          {loading && <Loader className="animate-spin size-5"/>}
          Confirmar
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col items-center gap-1">
          <Image
            src={'/check-circle-2.svg'}
            alt="Sucesso na reserva"
            width={80}
            height={80}
            className="mb-2"
          />

          <DialogTitle>
            <h1 className="text-2xl font-bold text-center">Reserva confirmada!</h1>
          </DialogTitle>

          <p className="text-muted-foreground text-center">Obrigado por reservar conosco. Nos vemos no horário marcado!</p>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
