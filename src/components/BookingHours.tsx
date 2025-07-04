'use client'
import { useState } from "react"
import { Button } from "./ui/button"

interface Props {
    onHourSelect: (hour: string) => void
    disponibleHours: {hour: string, disponible: boolean}[]
}

export default function BookingHoursComponent({ onHourSelect, disponibleHours }: Props) {
    const [checked, isChecked] = useState('')
    
    return (
        <>
            <div className="flex gap-1 items-center overflow-x-auto px-3 py-3">
                {disponibleHours.map((hour, index) => (
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