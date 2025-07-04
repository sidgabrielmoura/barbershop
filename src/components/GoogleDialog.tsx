import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

interface GoogleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GoogleDialog({open, onOpenChange}: GoogleDialogProps) {
    const handleGoogleLogin = async () => {
        await signIn("google")
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="px-7">
                    <section className="flex flex-col items-center justify-between gap-7">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-medium">Faça login na plataforma</h1>
                            <p className="text-muted-foreground text-md opacity-90 font-light">Conecte-se usando sua conta do Google</p>
                        </div>

                        <Button variant={"outline"} className="w-full justify-center" onClick={handleGoogleLogin}>
                            <FaGoogle className="text-xl size-10" />
                            <h1>Google</h1>
                        </Button>
                    </section>
                </DialogContent>
            </Dialog>
        </>
    )
}