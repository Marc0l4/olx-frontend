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
        router.push("/ad")

        return;
    }

    return (
        <>
            <div className="bg-gray-200 border-b border-gray-300 py-5">
                <PageContainer>
                    <div className="bg-lime-500 py-5 px-4 rounded-md shadow-md flex">
                        <button onClick={() => setShowCat(!showCat)} className="bg-blue-500 text-white rounded-md mx-5 h-10 px-5 hover:bg-blue-600">Categorias</button>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 flex">
                            <label className="flex-1">
                                <input
                                    {...register('item')}
                                    type="text"
                                    placeholder="Oque você procura?"
                                    className="h-10 rounded-md outline-none mr-5 text-black w-full px-3"
                                />
                            </label>
                            <label className="">
                                <select {...register('state')} className="h-10 rounded-md outline-none mx-5 w-28 text-center text-black" name="state" id="">
                                    <option value=""></option>
                                    {stateList.map((i, k) => (
                                        <option key={k} value={i._id}>{i.name}</option>
                                    ))}
                                </select>
                            </label>
                            <button className="bg-blue-500 text-white rounded-md h-10 px-5 hover:bg-blue-600">Pesquisar</button>
                        </form>
                    </div>
                    {showCat &&
                        <div className="flex flex-wrap mt-5">
                            {categories.map((i, k) => (
                                <div key={k} className="w-1/4 flex items-center  h-12 mb-3 hover:text-gray-600" >
                                    <img src={`/assets/${i.slug}.png`} onClick={() => router.push(`/ad/list`)} className="mx-3 cursor-pointer" />
                                    <span className="">{i.name}</span>
                                </div>
                            ))}
                        </div>
                    }
                </PageContainer>
            </div>
            <PageContainer>
                <h2 className="text-3xl font-bold">Anuncios recentes</h2>
                <div className="flex flex-wrap gap-12 mt-5 text-center">
                    {adList && adList.map((i, k) => (
                        <AdItem key={k} data={i} />
                    ))}
                </div>
                <Link href='/ads' className="font-bold inline-block mt-10">Ver Todos</Link>
                <hr />

                ...
            </PageContainer>
        </>
    );
}