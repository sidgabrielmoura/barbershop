'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function WellcomeComponent() {
  const [name, setName] = useState('')
  const { data } = useSession()

  useEffect(() => {
    if (!data?.user?.name) return;

    const firstName = data.user.name.split(" ")[0];
    setName(firstName);
  }, [data?.user?.name])

  return (
    <div className="py-3 pb-1 -space-y-1">
      <h1 className="font-bold text-[24px]">
        <span className="font-light">Olá</span>, {!data?.user ? 'faça seu login' : name}!
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