'use client'

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PageContainer } from "@/components/PageContainer";
import { StateType } from "@/types/StateType";
import { AdsType } from "@/types/AdType";
import { CatType } from "@/types/CatType";
import { AdItem } from "@/components/AdItem";

import useApi from '@/helpers/OlxApi';
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Inputs = {
    item: string;
    state: string
}

export const Home = () => {
    const router = useRouter();
    const api = useApi();
    const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();

    const [stateList, setStateList] = useState<StateType[]>([]);
    const [categories, setCategories] = useState<CatType[]>([]);
    const [adList, setAdList] = useState<AdsType[]>();
    const [showCat, setShowCat] = useState<boolean>(false);

    useEffect(() => {
        const getStates = async () => {
            const slist: AxiosResponse = await api.getStates();
            setStateList(slist.data.states)
        }
        getStates();
    }, []);
    useEffect(() => {
        const getCategories = async () => {
            const json: AxiosResponse = await api.getCategories();
            setCategories(json.data.categories)
        }
        getCategories();
    }, []);
    useEffect(() => {
        const getRecentAds = async () => {
            const json: AxiosResponse = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.data.ads)
        }
        getRecentAds();
    }, []);

    const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/ad/list?state=${data.state}&q=${data.item}`);

        return;
    }

    return (
        <>
            <div className="bg-gray-200 border-b border-gray-300 py-5">
                <PageContainer>
                    <div className="max-w-72 ml-16 bg-lime-500 py-5 px-4 rounded-md shadow-md flex flex-col
                       md:flex-row lg:max-w-full">
                        <button onClick={() => setShowCat(!showCat)} className="text-sm max-w-32 w-full bg-blue-500 text-white rounded-md ml-16 h-10 px-5 
                            hover:bg-blue-600 hover:transition-all hover:ease-linear
                            md:ml-0 lg:text-base">Categorias</button>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="md:flex md:items-start
                            md:flex-row md:flex-1">
                            <label className="flex-1">
                                <input
                                    {...register('item')}
                                    type="text"
                                    placeholder="Oque você procura?"
                                    className="my-4 h-10 ml-2 rounded-md outline-none text-black w-full px-3 md:my-0 md:ml-0"
                                />
                            </label>
                            <label className="">
                                <select {...register('state')} className="my-2 h-10 rounded-md outline-none mx-2 w-28 text-center text-black md:my-0" name="state" id="">
                                    <option value=""></option>
                                    {stateList.map((i, k) => (
                                        <option key={k} value={i.name}>{i.name}</option>
                                    ))}
                                </select>
                            </label>
                            <button className="text-sm mt-4 ml-2 bg-blue-500 text-white rounded-md h-10 px-5 
                                hover:bg-blue-600 hover:transition-all hover:ease-linear
                                md:mt-0 lg:text-base">Pesquisar</button>
                        </form>

                    </div>
                    {showCat &&
                        <div className="flex flex-row flex-wrap mt-5">
                            {categories.map((i, k) => (
                                <div
                                    key={k}
                                    onClick={() => router.push(`/ad/list?cat=${i.slug}`)}
                                    className="w-1/2 flex items-center h-16 mb-3 rounded-lg cursor-pointer
                                        md:w-1/4
                                        hover:bg-lime-500 hover:text-white hover:transition-all hover:ease-linear"
                                >
                                    <img src={`${i.img}.png`} className="mx-3" />
                                    <span className="">{i.name}</span>
                                </div>
                            ))}
                        </div>
                    }
                </PageContainer>
            </div>
            <PageContainer>
                <h2 className="text-3xl font-bold text-center">Anuncios recentes</h2>
                <div className="flex justify-center flex-wrap gap-4 mt-5 text-center md:gap-12 md:justify-normal">
                    {adList && adList.map((i, k) => (
                        <AdItem key={k} data={i} />
                    ))}
                </div>
                <Link href='/ad/list' className="font-bold inline-block mt-10 ml-3 mb-3 
                    hover:text-gray-400 hover:transition-all hover:ease-linear">Ver Todos</Link>
                <hr />
            </PageContainer>
        </>
    );
}