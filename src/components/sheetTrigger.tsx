import { CalendarDays, Database, Home, LogOut, Menu, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { QuickSearchServices } from "@/constants";

export default function SheetTriggerComponent() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={"icon"} variant={"outline"} className="p-2">
                    <Menu className="cursor-pointer" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex items-center justify-between w-full">
                        <h1 className="font-bold">Menu</h1>
                        <SheetClose asChild>
                            <Button size={"icon"} variant={"outline"} className="p-2">
                                <X className="cursor-pointer" />
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <section className="mt-10 flex flex-col gap-7">
                    <div className="flex gap-4 items-center">
                        <Image src={'/avatar.png'} alt="avatar" width={20} height={20} className="size-14 rounded-full border-2 border-violet-500" />
                        <div className="-space-y-1">
                            <h1 className="text-lg font-bold">Pedro Alves</h1>
                            <p className="text-sm text-zinc-300">pedroalves53@gmail.com</p>
                        </div>
                    </div>

                    <div className="h-[0.1px] w-full bg-zinc-700" />

                    <div>
                        <Button variant={"default"} className="w-full justify-start">
                            <Home className="text-xl size-10" />
                            <h1>Inicio</h1>
                        </Button>
                        <Button variant={"ghost"} className="w-full justify-start">
                            <CalendarDays className="text-xl size-10" />
                            <h1>Agendamentos</h1>
                        </Button>
                    </div>

                    <div className="h-[0.1px] w-full bg-zinc-700" />

                    <div className="flex flex-col gap-2">
                        {QuickSearchServices.map((service, index) => (
                            <Button key={index} variant={"ghost"} className="w-full justify-start">
                                <service.icon className="text-xl size-10" />
                                {service.name}
                            </Button>
                        ))}
                    </div>

                    <div className="h-[0.1px] w-full bg-zinc-700" />

                    <Button variant={"ghost"} className="w-full justify-start px-5 text-red-400/80">
                        <LogOut className="text-xl size-10" />
                        <h1>Sair da conta</h1>
                    </Button>
                </section>
            </SheetContent>
        </Sheet>
    )
}