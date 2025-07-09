"use client"

import { StarIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

export default function StarsComponent() {
    const [starsSelected, setStarsSelected] = useState<number[]>([])

    const HandleAddStarsToConst = (count: number) => {

        const newStars = Array.from({ length: count }, (_, i) => i + 1)
        setStarsSelected(newStars)
    }

    return (
        <>
            <section className="flex justify-between  items-center mt-10">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon 
                            className={`stroke-1 size-8 ${starsSelected.includes(index + 1) && 'fill-yellow-500 stroke-yellow-600'}`} 
                            key={index} 
                            onClick={() => HandleAddStarsToConst(index + 1)}
                        />
                    ))}
                </div>

                <Button variant={'secondary'} disabled={starsSelected.length === 0}>Enviar Avaliação</Button>
            </section>
        </>
    )
}