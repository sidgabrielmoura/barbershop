'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function WellcomeComponent() {
  const { data } = useSession()

  return (
    <div className="py-3 pb-1 -space-y-1">
      <h1 className="font-bold text-[24px]">
        <span className="font-light">Olá</span>, {!data?.user?.name ? 'faça seu login' : data?.user?.name.split(" ")[0]}!
      </h1>
      <h1 className="text-[15px] text-muted-foreground">
        {new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}.
      </h1>
    </div>
  )
}