import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { QuickSearchServices } from "@/constants";
import { Card, CardContent } from "./ui/card";

export default function SearchComponent() {
    return (
        <div className="flex-col flex items-center justify-between w-full gap-1 mt-6">
            <div className="flex items-center gap-1 w-full">
                <Input type="search" placeholder="Faça sua busca..." className="outline-none flex-1 text-sm" />
                <Button size={'icon'} variant={'default'}>
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