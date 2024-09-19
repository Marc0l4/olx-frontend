'use client'

import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { SignInFormSchema } from "@/libs/zod/SignInFormSchema";
import { SignInInputs } from "@/types/Inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from '@/helpers/OlxApi';
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/ErrorMessage";
import { AxiosResponse } from "axios";
import { UserContext } from "@/Contexts/UserContext";

const Page = () => {
    const api = useApi();
    const router = useRouter();
    const ctx = useContext(UserContext)

    if (!ctx) return false;

    const { handleSubmit, register, formState: { errors } } = useForm<SignInInputs>({
        resolver: zodResolver(SignInFormSchema)
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberPassword, setRememberPassword] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFormSubmit: SubmitHandler<SignInInputs> = async (data) => {
        setDisabled(true);
        setError('');

        const json: AxiosResponse = await api.login(email, password);

        if (!json.data.error) {
            ctx.setToken(json.data.token);
            router.push('/');
        } else {
            setError(json.data.error)
            setDisabled(false)
        }
    }

    return (
        <PageContainer>
            <PageTitle title={'Login'} />
            {error &&
                <ErrorMessage error={error} />
            }
            <div className="flex flex-col justify-center items-center md:items-center">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl shadow-sm shadow-gray-500 py-3 mt-3 max-w-sm w-full 
                md:max-w-lg">
                    <label className="flex items-start p-3 max-w-lg md:items-center">
                        <div className="text-left pr-5 font-bold text-sm md:text-right md:w-40">Email</div>
                        <div className="flex-1">
                            <input
                                {...register('email')}
                                className={`w-52 text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                    md:w-full
                                    ${errors.email && 'outline-red-600 border-red-600'}
                                    `}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={disabled}
                            />
                            {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="text-left pr-5 font-bold text-sm md:text-right md:w-40">Senha</div>
                        <div className="flex-1">
                            <input
                                {...register('password')}
                                className={`w-52 text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                    md:w-full
                                     ${errors.password && 'outline-red-600 border-red-600'}
                                    `}
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={disabled}
                            />
                            {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-start p-3 max-w-lg md:justify-center md:items-center">
                        <div className="text-left pr-5 font-bold text-sm md:text-right md:w-40">Lembrar Senha</div>
                        <div className="">
                            <input
                                type="checkbox"
                                className=""
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={() => setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label className="flex ml-36 p-3 max-w-lg md:ml-16">
                        <div className="flex-1">
                            <button disabled={disabled} className="rounded-md text-white bg-blue-500 py-2 px-3 
                            hover:bg-blue-700 hover:transition-all hover:ease-linear
                            md:ml-32">Login</button>
                        </div>
                    </label>
                </form>
                <div className="mr-48 my-4 p-1 text-sm w-full max-w-lg text-right md:mr-80">
                    <div className="flex-1">
                        <button disabled={disabled} onClick={() => router.push('/user/signup')} className="rounded-md text-white bg-blue-500 py-2 px-3 
                                hover:bg-blue-700 hover:transition-all hover:ease-linear">
                            Não tem uma conta?
                            <br />
                            Cadastre-se agora mesmo
                        </button>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export default Page;