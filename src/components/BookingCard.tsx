import { Card, CardContent } from "./ui/card"

interface BookingCardInterface {
    service: string,
    price: string,
    dayMonth?: string,
    hour?: string,
    barbershop: string
}
export default function BookingCard({ ...props }: BookingCardInterface) {
    return(
        <div className="px-3">
            <Card className="text-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold">{props.service}</h2>
                        <span className="text-lg font-semibold">{props.price}</span>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Data</span>
                            <span>{props.dayMonth}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Horário</span>
                            <span>{props.hour || '--'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Barbearia</span>
                            <span>{props.barbershop}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}