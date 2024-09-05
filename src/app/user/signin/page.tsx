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
import { login } from "@/helpers/authHandler";

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
            ctx.setToken(json.data.token ? true : false);
            ctx.setUserToken(json.data.token)
            login(json.data.token, rememberPassword ? true : false);
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
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl shadow-sm shadow-gray-500 py-3 mt-3 max-w-xl w-full">
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Email</div>
                        <div className="flex-1">
                            <input
                                {...register('email')}
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
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
                        <div className="w-40 text-right pr-5 font-bold text-sm">Senha</div>
                        <div className="flex-1">
                            <input
                                {...register('password')}
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
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
                    <label className="flex justify-center items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Lembrar Senha</div>
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
                    <label className="flex ml-16 p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm"></div>
                        <div className="flex-1">
                            <button disabled={disabled} className="rounded-md text-white bg-blue-500 py-2 px-3 hover:bg-blue-700">Login</button>
                        </div>
                    </label>
                </form>
            </div>
        </PageContainer>
    );
}

export default Page;