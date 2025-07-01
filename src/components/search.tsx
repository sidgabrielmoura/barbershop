'use client'
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { QuickSearchServices } from "@/constants";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = () => {
        if(searchValue.length > 2)
        router.push(`/barbershops?search=${searchValue}`)
    }

    return (
        <div className="flex-col flex items-center justify-between w-full gap-1 mt-6">
            <div className="flex items-center gap-1 w-full">
                <div className="w-full relative inset-0">
                    <Input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Faça sua busca..." className="outline-none flex-1 text-sm h-12" />
                    <span className={`absolute right-3 top-4 text-muted-foreground text-xs ${searchValue.length <= 2 && 'text-red-500/80'}`}>{searchValue.length}</span>
                </div>
                <Button onClick={handleSearch} size={'icon'} variant={'default'} className="size-12">
                    <Search />
                </Button>
            </div>

            <div className="w-full flex items-center justify-between mt-2 gap-1 overflow-x-auto">
                {QuickSearchServices.map((service, index) => (
                    <Card key={index} className="w-full flex justify-center items-center rounded-sm">
                        <CardContent className="px-5 py-3 max-h-10 flex justify-center items-center gap-1">
                            <span className="">
                                {<service.icon />}
                            </span>
                            <span className="text-xs font-semibold">{service.name}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}