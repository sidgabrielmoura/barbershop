import { Menu, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
    return (
        <Card className="">
            <CardContent className="py-7 px-4">
                <div className="flex items-center justify-between w-full">
                    <Image src={'./Logo.svg'} alt="logo" height={18} width={144} />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size={"icon"} variant={"outline"} className="p-2">
                                <Menu className="cursor-pointer" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="font-bold">Menu</h1>
                                    <SheetClose asChild>
                                        <Button size={"icon"} variant={"outline"} className="p-2">
                                            <X className="cursor-pointer" />
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </CardContent>
        </Card>
    );
}