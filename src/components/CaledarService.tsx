'use client'
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

interface Props {
    onDateSelect: (date: string) => void
}

export default function CalendarServiceComponent({ onDateSelect }: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    useEffect(() => {
        if (date) {
            const formatted = date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long"
            })
            onDateSelect(formatted)
        }
    }, [date])

    return (
        <div className="w-full">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border shadow-sm w-full border-none px-2"
                captionLayout="label"
            />
        </div>
    )
}