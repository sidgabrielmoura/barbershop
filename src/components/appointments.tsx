'use client'
import { Booking, Prisma } from "@/generated/prisma";
import { Card, CardContent } from "./ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import BookingSheet from "./bookingSheet";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { deleteBooking } from "@/app/actions/delete-booking";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import getAppointments from "@/app/actions/getAppointments";
import { useRouter } from "next/navigation";

interface BookingInterface {
    booking: Prisma.BookingGetPayload<{
        include: { service: { include: { barbershop: true } } }
    }>
}
export default function Appointments({ booking }: BookingInterface) {
    const route = useRouter()
    const confirmed = isFuture(booking.date)
    const [loading, setLoading] = useState(false)
    const {data} = useSession()
    const [date, setDate] = useState<[day: string, month: string, hour: string]>()

    useEffect(() => {
        if (!booking?.date) return;

        const dateObj = new Date(booking.date);

        const day = format(dateObj, "dd", { locale: ptBR });
        const month = format(dateObj, "MMMM", { locale: ptBR });
        const hour = format(dateObj, "HH:mm");

        setDate([day, month, hour]);
    }, [booking])

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }, [])

    const handleDeleteBooking = async () => {
        try {
            await deleteBooking(booking.id)
            toast.success('agendamento deletado com sucesso!')

            route.refresh()
        } catch {
            toast.error('ocorreu um erro ao deletar o agendamento')
        }
    }

    return (
        <>
            {!loading ? (
                <div className="w-full flex flex-col justify-between mt-2 gap-5" >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Card>
                                <CardContent className="flex justify-between py-4 px-0">
                                    <section className="flex w-[500px] flex-col gap-2 border-r-[.5px] border-zinc-600 px-4">
                                        <span className={`px-3 py-1 w-fit rounded-full bg-gradient-to-br font-bold text-sm 
                                            ${confirmed ? 'from-violet-600/50 via-violet-500/60 to-violet-600/50 text-violet-400' : 'from-zinc-600/50 via-zinc-500/60 to-zinc-600/50 text-zinc-400'}`}>
                                            {confirmed ? 'Confirmado' : 'Finalizado'}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Image
                                                alt={booking.service.barbershop.name}
                                                src={`${booking.service.barbershop.imageUrl}`}
                                                width={50}
                                                height={150}
                                                className="size-10 object-cover rounded-full"
                                            />
                                            <div className="flex flex-col -space-y-2">
                                                <h1 className="font-bold text-lg truncate">{booking.service.name}</h1>
                                                <h1 className="font-thin text-lg truncate">{booking.service.barbershop.name}</h1>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="w-[200px] h-full flex flex-col items-center justify-center">
                                        <h1 className="text-xl font-bold text-zinc-500">
                                            {date?.[1]}
                                        </h1>
                                        <h1 className="text-3xl font-light text-zinc-50 -tracking-[1px]">
                                            {date?.[0]}
                                        </h1>
                                        <h1 className="text-xl font-bold text-zinc-500">
                                            {date?.[2]}
                                        </h1>
                                    </section>
                                </CardContent>
                            </Card>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <div className="flex items-center justify-between w-full border-b-2 pb-5">
                                    <h1 className="font-bold">Informações da reserva</h1>
                                    <SheetClose asChild>
                                        <Button size={"icon"} variant={"outline"} className="p-2">
                                            <X className="cursor-pointer" />
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetHeader>

                            <div className="h-[94%] flex flex-col justify-between">
                                <BookingSheet service={booking.service} barbershop={booking.service.barbershop} confirmed={confirmed} date={booking.date.toString()} />

                                <div className="w-full flex items-center gap-2">
                                    <SheetClose asChild>
                                        <Button variant={'secondary'} className="w-full">Voltar</Button>
                                    </SheetClose>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant={'secondary'} className="w-full bg-red-500">Cancelar reserva</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>deseja cancelar a reserva?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Essa ação poderá resultar na perda do horário e não poderá ser revertida
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>voltar</AlertDialogCancel>
                                                {confirmed && <AlertDialogAction onClick={handleDeleteBooking} className="bg-red-500/80">Confirmar</AlertDialogAction>}
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div >
            ) : (
                <div className="flex flex-col gap-3 h-full mt-3">
                    <Card>
                        <CardContent className="flex justify-between py-4 px-0 min-h-28 animate-pulse">
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}