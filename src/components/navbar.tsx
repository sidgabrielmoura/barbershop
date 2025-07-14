"use client"
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import SheetTriggerComponent from "./sheetTrigger";
import Link from "next/link";

export default function Navbar() {
    return (
        <Card className="">
            <CardContent className="py-7 px-4">
                <div className="flex items-center justify-between w-full">
                    <Link href={'/'}>
                        <Image src={'./Logo.svg'} alt="logo" height={18} width={144} />
                    </Link>
                    <SheetTriggerComponent/>
                </div>
            </CardContent>
        </Card>
    );
}