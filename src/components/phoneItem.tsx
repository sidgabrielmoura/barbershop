'use client'
import { Check, Smartphone } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

interface PhoneInterdace {
    phone: string
}
export default function PhoneComponent({ phone }: PhoneInterdace) {
    const [copied, setCopied] = useState(false)
    const copyPhone = (phone: string) => {
        navigator.clipboard.writeText(phone)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                <Smartphone />
                {phone}
            </div>
            <Button variant={'outline'} onClick={() => copyPhone(phone)} className="w-[100px]">
                {!copied ? (<span>Copiar</span>) : (<Check/>)}
            </Button>
        </div>
    )
}