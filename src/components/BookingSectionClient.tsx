'use client'

import { useState } from "react"
import BookingCard from "./BookingCard"
import CalendarServiceComponent from "./CaledarService"
import BookingHoursComponent from "./BookingHours"

export default function BookingSectionClient({ service, barbershopName }: any) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedHour, setSelectedHour] = useState<string>("")

  return (
    <>
      <CalendarServiceComponent onDateSelect={setSelectedDate} />
      <div className="h-[0.1px] w-full bg-zinc-700/50" />
      <BookingHoursComponent onHourSelect={setSelectedHour} />
      <div className="h-[0.1px] w-full bg-zinc-700/50" />
      <BookingCard
        service={service?.name}
        price={`R$ ${Number(service?.price ?? 0).toFixed(2)}`}
        barbershop={barbershopName}
        hour={selectedHour}
        dayMonth={selectedDate}
      />
    </>
  )
}
