'use client'
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";

interface Props {
  onDateSelect: (date: string) => void
  dateISO: (date: string) => void
}

export default function CalendarServiceComponent({ onDateSelect, dateISO }: Props) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const [date, setDate] = useState<Date | undefined>(tomorrow)

  useEffect(() => {
    if (date) {
      const formatted = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long"
      })
      onDateSelect(formatted)
      dateISO(date.toString())
    }
  }, [date])

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(d) => d <= new Date(new Date().setHours(0, 0, 0, 0))}
        className="rounded-md border shadow-sm w-full border-none px-2"
        captionLayout="label"
      />
    </div>
  )
}
