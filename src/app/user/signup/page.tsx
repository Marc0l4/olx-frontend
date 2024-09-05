'use client'

import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { SignUpInputs } from "@/types/Inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from '@/helpers/OlxApi';
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/ErrorMessage";
import { AxiosResponse } from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { SignUpFormSchema } from "@/libs/zod/SignUpFormSchema";
import { StateType } from "@/types/StateType";

const Page = () => {
    const api = useApi();
    const router = useRouter();
    const ctx = useContext(UserContext)

    if (!ctx) return false;

    const { handleSubmit, register, formState: { errors } } = useForm<SignUpInputs>({
        resolver: zodResolver(SignUpFormSchema)
    });

    const [name, setName] = useState<string>('');
    const [stateLoc, setStateLoc] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [stateList, setStateList] = useState<StateType[]>([]);

    useEffect(() => {
        const getStates = async () => {
            const slist: AxiosResponse = await api.getStates();
            setStateList(slist.data.states);
        }
        getStates();
    }, []);

    const handleFormSubmit: SubmitHandler<SignUpInputs> = async (data) => {
        setDisabled(true);

        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais');
            return;
        }

        const json: AxiosResponse = await api.register(name, email, password, stateLoc.toLowerCase());

        if (!json.data.error) {
            ctx.setToken(json.data.token ? true : false)
            setDisabled(false);
            console.log(json.data)
            router.push('/');
        } else {
            console.log(json)
            setDisabled(false)
        }
    }

    return (
        <PageContainer>
            <PageTitle title={'Cadastro'} />
            {error &&
                <ErrorMessage error='Algo deu errado' />
            }
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl shadow-sm shadow-gray-500 py-3 mt-3 max-w-xl w-full">
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Nome</div>
                        <div className="flex-1">
                            <input
                                {...register('name')}
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                    ${errors.name && 'outline-red-600 border-red-600'}
                                    `}
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={disabled}
                            />
                            {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Estado</div>
                        <div className="flex-1">
                            <select name="state" className=" w-14 text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800" value={stateLoc} onChange={e => setStateLoc(e.target.value)}>
                                <option value=""></option>
                                {stateList.map((i, k) => (
                                    <option key={k} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>
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
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Confirmar Senha</div>
                        <div className="flex-1">
                            <input
                                {...register('confirmPassword')}
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                        ${errors.password && 'outline-red-600 border-red-600'}
                                    `}
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                disabled={disabled}
                            />
                            {errors.confirmPassword && <p className="text-red-600 mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                    </label>
                    <label className="flex ml-16 p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm"></div>
                        <div className="flex-1">
                            <button disabled={disabled} className="rounded-md text-white bg-blue-500 py-2 px-3 hover:bg-blue-700">Cadastrar</button>
                        </div>
                    </label>
                </form>
            </div>
        </PageContainer>
    );
}

export default Page;