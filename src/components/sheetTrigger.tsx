'use client'
import { CalendarDays, Database, Home, LogIn, LogOut, Menu, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { QuickSearchServices } from "@/constants";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FaGoogle } from "react-icons/fa6";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import GoogleDialog from "./GoogleDialog";

export default function SheetTriggerComponent() {
    const [openDialog, setOpenDialog] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const search = searchParams.get("search")

    const { data } = useSession()

    const handleSignOut = async () => {
        await signOut()
    }

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
                        <h1 className="font-bold">{data?.user ? 'Menu' : 'Olá, Faça seu login!'}</h1>
                        <SheetClose asChild>
                            <Button size={"icon"} variant={"outline"} className="p-2">
                                <X className="cursor-pointer" />
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <section className="mt-10 flex flex-col gap-7">
                    {data?.user && (
                        <div className="flex gap-4 items-center">
                            <Image src={data.user.image || '/avatar.png'} alt="avatar" width={20} height={20} className="size-14 rounded-full border-2 border-violet-500" />
                            <div className="-space-y-1">
                                <h1 className="text-lg font-bold">{data.user.name}</h1>
                                <p className="text-sm text-zinc-300">{data.user.email}</p>
                            </div>
                        </div>
                    )}

                    {!data?.user && (
                        <>
                            <Button variant={"default"} onClick={() => setOpenDialog(true)} className="w-full justify-center">
                                <LogIn className="text-xl size-10" />
                                <h1>Entrar</h1>
                            </Button>
                            <GoogleDialog open={openDialog} onOpenChange={setOpenDialog}/>
                        </>
                    )}

                    <div className="h-[0.1px] w-full bg-zinc-700" />

                    <div>
                        <Link href={'/'}>
                            <Button variant={pathname === '/' ? "default" : "ghost"} className="w-full justify-start">
                                <Home className="text-xl size-10" />
                                <h1>Inicio</h1>
                            </Button>
                        </Link>
                        <Link href={'/'}>
                            <Button variant={"ghost"} className="w-full justify-start">
                                <CalendarDays className="text-xl size-10" />
                                <h1>Agendamentos</h1>
                            </Button>
                        </Link>
                    </div>

                    <div className="h-[0.1px] w-full bg-zinc-700" />

                    <div className="flex flex-col gap-2">
                        {QuickSearchServices.map((service, index) => (
                            <Link href={`barbershops?search=${service.name}`}>
                                <Button
                                    key={index}
                                    variant={
                                        pathname.startsWith('/barbershops') &&
                                            search === service.name.toLowerCase()
                                            ? "default"
                                            : "ghost"
                                    }
                                    className="w-full justify-start"
                                >
                                    <service.icon className="text-xl size-10" />
                                    {service.name}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {data?.user && (
                        <>
                            <div className="h-[0.1px] w-full bg-zinc-700" />

                            <Button onClick={handleSignOut} variant={"ghost"} className="w-full justify-start px-5 text-red-400/80">
                                <LogOut className="text-xl size-10" />
                                <h1>Sair da conta</h1>
                            </Button>
                        </>
                    )}
                </section>
            </SheetContent>
        </Sheet>
    )
}