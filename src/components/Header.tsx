'use client'

import { UserContext } from "@/Contexts/UserContext";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useContext } from "react";
import { SideHeader } from "./SideHeader";

export const Header = () => {
    const ctx = useContext(UserContext)

    if (!ctx) return false;

    const logged = ctx.token !== '' ? true : false;

    const handleLogout = () => {
        ctx.setToken('')
        revalidatePath('/')
    }

    return (
        <header className="h-16 bg-white border-b border-gray-300">
            <div className="container mx-auto flex ">
                <Link className="flex-1 flex items-center h-16 ml-4" href='/'>
                    <span className="text-3xl font-bold text-violet-600">O</span>
                    <span className="text-3xl font-bold text-green-600">L</span>
                    <span className="text-3xl font-bold text-orange-600">X</span>
                </Link>
                <SideHeader />
                <nav className="py-3 hidden lg:block">
                    <ul className="flex gap-5 items-center h-10">
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
                </nav>
            </div>
        </header>
    );
}