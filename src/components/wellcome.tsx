'use client'

export default function WellcomeComponent() {

  return (
    <div className="py-3 -space-y-1">
      <h1 className="font-bold text-[24px]">
        <span className="font-light">Olá</span>, {'faça seu login!'}
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