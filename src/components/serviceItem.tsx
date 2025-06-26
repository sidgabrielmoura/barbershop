import { BarbershopService } from "@/generated/prisma";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ServiceItemProps {
    service: BarbershopService;
}
export default function ServiceItem({service}: ServiceItemProps) {
    return (
        <Card>
            <CardContent className="py-3 px-2 flex gap-2">
                <Image src={service.imageUrl} alt={service.name} width={100} height={100} className="size-28 rounded-2xl"/>
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>

                    <div className="flex items-end justify-between">
                        <span className="text-lg font-bold text-violet-500/90">R$ {service.price.toFixed(2)}</span>
                        <Button variant={'secondary'}>Reservar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}