'use client'
import { useState } from "react"
import { Button } from "./ui/button"

interface Props {
    onHourSelect: (hour: string) => void
}

export default function BookingHoursComponent({ onHourSelect }: Props) {
    const [checked, isChecked] = useState('')

    const hours = [
        { hour: '08:00', disponible: true },
        { hour: '09:00', disponible: true },
        { hour: '10:00', disponible: true },
        { hour: '11:00', disponible: true },
        { hour: '12:00', disponible: false },
        { hour: '13:30', disponible: true },
        { hour: '14:00', disponible: true },
        { hour: '15:00', disponible: true },
        { hour: '16:00', disponible: true },
        { hour: '17:00', disponible: true },
    ]
    
    return (
        <>
            <div className="flex gap-1 items-center overflow-x-auto px-3 py-3">
                {hours.map((hour, index) => (
                    <div key={index}>
                        <Button
                            size="lg"
                            disabled={!hour.disponible}
                            variant={hour.hour === checked ? 'default' : 'outline'}
                            className="rounded-full"
                            onClick={() => {
                                isChecked(hour.hour)
                                onHourSelect(hour.hour)
                            }}
                        >
                            {hour.hour}
                        </Button>
                    </div>
                ))}
            </div>
        </>
    )
}