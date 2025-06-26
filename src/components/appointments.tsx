import { Card, CardContent } from "./ui/card";

export default function Appointments() {
    return (
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
    )
}