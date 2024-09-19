'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { UserContext } from "@/Contexts/UserContext";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useContext } from "react";


export const SideHeader = () => {
    const ctx = useContext(UserContext)

    if (!ctx) return false;

    const logged = ctx.token !== '' ? true : false;

    const handleLogout = () => {
        ctx.setToken('')
        revalidatePath('/')
    }

    return (
        <div className="mr-2 my-3 px-1 py-2 border bg-blue-500 rounded-lg text-center text-white
            hover:bg-blue-600 hover:transition-all hover:ease-in-out
            md:hidden lg:hidden">
            <Sheet>
                <SheetTrigger>Abir Menu</SheetTrigger>
                <SheetContent className="bg-black/40 border border-black/60 rounded-lg">
                    <SheetHeader>
                        <SheetTitle className="text-white mb-5">Menu</SheetTitle>
                        <SheetDescription>
                            <ul className="flex justify-center items-start flex-col gap-y-10">
                                {logged &&
                                    <>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-violet-500 py-1 px-3 
                                        hover:bg-violet-600 hover:shadow-xl hover:transition-all hover:ease-linear" href='/me'>Minha conta</Link>
                                        </li>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-green-500 py-1 px-3 
                                    hover:bg-green-600 hover:shadow-xl hover:transition-all hover:ease-linear" href='/ad/add'>Poste um anuncio</Link>
                                        </li>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-red-500 py-1 px-3 
                                    hover:bg-red-600 hover:shadow-xl hover:transition-all hover:ease-linear" onClick={handleLogout} href='/'>Sair</Link>
                                        </li>
                                    </>
                                }
                                {!logged &&
                                    <>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-violet-500 py-1 px-3 
                                    hover:bg-violet-600 hover:shadow-xl hover:transition-all hover:ease-linear" href='/user/signin'>Login</Link>
                                        </li>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-green-500 py-1 px-3 
                                    hover:bg-green-600 hover:shadow-xl hover:transition-all hover:ease-linear" href='/user/signup'>Cadastrar</Link>
                                        </li>
                                        <li>
                                            <Link className="text-sm rounded-md text-white bg-orange-500 py-1 px-3 
                                    hover:bg-orange-600 hover:shadow-xl hover:transition-all hover:ease-linear" href='/user/signin'>Poste um anuncio</Link>
                                        </li>
                                    </>
                                }

                            </ul>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}