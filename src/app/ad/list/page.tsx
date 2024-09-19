'use client'

import { PageContainer } from "@/components/PageContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdsType } from "@/types/AdType";
import { CatType } from "@/types/CatType";
import { StateType } from "@/types/StateType";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useApi from '@/helpers/OlxApi';
import { SearchAdsInput } from "@/types/Inputs";
import Link from "next/link";
import { AdItem } from "@/components/AdItem";

type Props = {
    searchParams: {
        q?: string;
        state?: string;
        cat?: string;
    }
}

const Page = ({ searchParams }: Props) => {
    const router = useRouter();
    const api = useApi();
    const { handleSubmit, register } = useForm<SearchAdsInput>();

    //const { q, state, cat } = searchParams;

    const [loading, setLoading] = useState<boolean>(true)
    const [q, setQ] = useState<string>(searchParams.q ? searchParams.q : '');
    const [state, setState] = useState<string>(searchParams.state ? searchParams.state : '');
    const [cat, setCat] = useState<string>(searchParams.cat ? searchParams.cat : '')
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [categories, setCategories] = useState<CatType[]>([]);
    const [adList, setAdList] = useState<AdsType[]>();

    useEffect(() => {
        const getURL = async () => {
            let queryString = [];
            if (q !== '' && q !== undefined) queryString.push(`q=${q}`)
            if (cat !== '' && cat !== undefined) queryString.push(`cat=${cat}`)
            if (state !== '' && state !== undefined) queryString.push(`state=${state}`)
            router.replace(`/ad/list?${queryString.join('&')}`);
        }
        getURL()
        getAdsList();
    }, [q, cat, state]);

    const getAdsList = async () => {
        const json: AxiosResponse = await api.getAds({
            sort: 'desc',
            limit: 5,
            q,
            cat,
            state
        });
        setAdList(json.data.ads)
    }

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

    const handleFormSubmit: SubmitHandler<SearchAdsInput> = (data) => {

        return;
    }

    return (
        <PageContainer>
            <div className="flex flex-col mt-5 md:flex-row">
                <div className="w-72 mr-5">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <input
                            {...register('q')}
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            placeholder="Oque você procura?"
                            type="text"
                            className="border-2 border-lime-500 h-7 p-2 ml-3 rounded-md outline-none w-full text-black md:ml-0"
                        />
                        <div className="my-3 ml-3 md:ml-0">Estado:</div>
                        <select
                            {...register('state')}
                            value={state}
                            onChange={e => setState(e.target.value)}
                            name="state"
                            id=""
                            className="border-2 border-lime-500 h-7 ml-3 rounded-md outline-none w-20 text-center text-black md:ml-0"
                        >
                            <option value=''></option>
                            {stateList.map((i, k) => (
                                <option key={k} value={i._id}>{i.name}</option>
                            ))}
                        </select>
                        <div className="my-3 ml-3 md:ml-0">Categoria:</div>
                        <ul
                            {...register('cat')}
                            className="flex flex-wrap md:block"
                        >
                            {categories.map((i, k) => (
                                <li
                                    key={k}
                                    onClick={() => setCat(i.id)}
                                    className={`gap-3 max-w-36 cursor-pointer flex items-center p-3 rounded-xl 
                                        hover:bg-lime-500 hover:text-white hover:transition-all hover:ease-linear
                                        ${cat === i.slug && 'bg-lime-500 text-white'}
                                    `}
                                >
                                    <img src={`${i.img}.png`} className="h-10 w-10" alt="" />
                                    <span className="text-sm">{i.name}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                {adList &&
                    <div className="flex-1">
                        <h1 className="font-bold text-center text-2xl mb-5">Resultados</h1>
                        <div className="flex flex-wrap ml-2 gap-4 md:ml-0">
                            {adList.map((i, k) => (
                                <Link className="" key={k} href={`/ad/item?id=${i._id}`}>
                                    <AdItem data={i} />
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>

        </PageContainer>
    );
}

export default Page;