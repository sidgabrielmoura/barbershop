import { CalendarDays, Database, Home, LogOut, Menu, X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { QuickSearchServices } from "@/constants";
import SheetTriggerComponent from "./sheetTrigger";

export default function Navbar() {
    return (
        <Card className="">
            <CardContent className="py-7 px-4">
                <div className="flex items-center justify-between w-full">
                    <Image src={'./Logo.svg'} alt="logo" height={18} width={144} />
                    <SheetTriggerComponent/>
                </div>
            </CardContent>
        </Card>
    );
}