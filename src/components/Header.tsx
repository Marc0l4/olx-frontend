'use client'

import { UserContext } from "@/Contexts/UserContext";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const Header = () => {
    const router = useRouter();
    const ctx = useContext(UserContext)

    if (!ctx) return false;

    let logged = ctx.token

    const handleLogout = () => {
        ctx.setToken(false);
        router.push('/');
    }

    return (
        <header className="h-16 bg-white border-b border-gray-300">
            <div className="container mx-auto flex">
                <Link className="flex-1 flex items-center h-16" href='/'>
                    <span className="text-3xl font-bold text-violet-600">O</span>
                    <span className="text-3xl font-bold text-green-600">L</span>
                    <span className="text-3xl font-bold text-orange-600">X</span>
                </Link>
                <nav className="py-3">
                    <ul className="flex gap-5 items-center h-10">
                        {logged &&
                            <>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-violet-500 py-1 px-3 hover:bg-violet-600" href='/me'>Minha conta</Link>
                                </li>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-green-500 py-1 px-3 hover:bg-green-600" href='/ad/add'>Poste um anuncio</Link>
                                </li>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-red-500 py-1 px-3 hover:bg-red-600" onClick={handleLogout} href='/'>Sair</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-violet-500 py-1 px-3 hover:bg-violet-600" href='/user/signin'>Login</Link>
                                </li>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-green-500 py-1 px-3 hover:bg-green-600" href='/user/signup'>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link className="text-sm rounded-md text-white bg-orange-500 py-1 px-3 hover:bg-orange-600" href='/user/signin'>Poste um anuncio</Link>
                                </li>
                            </>
                        }

                    </ul>
                </nav>
            </div>
        </header>
    );
}