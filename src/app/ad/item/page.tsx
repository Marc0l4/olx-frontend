'use client'

import { AdItem } from "@/components/AdItem";
import { PageContainer } from "@/components/PageContainer";
import { formatDate, formatPrice } from "@/helpers/formats";
import useApi from '@/helpers/OlxApi';
import { OneAdType } from "@/types/OneAdType";
import { StateType } from "@/types/StateType";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

type Props = {
    searchParams: {
        id: string
    }
}

const Page = ({ searchParams }: Props) => {
    const api = useApi();
    const [stateList, setStateList] = useState<string>('');

    const id = searchParams.id;

    const [loading, setLoading] = useState<boolean>(true);
    const [adInfo, setAdInfo] = useState<OneAdType>();

    useEffect(() => {
        const getAdInfo = async (id: string) => {
            const json: AxiosResponse = await api.getOneAd(id, true);
            setAdInfo(json.data);
            console.log(json.data.images)
            setLoading(false);
        };
        getAdInfo(id)

    }, []);

    const getStates = async () => {
        const json: AxiosResponse = await api.getStates();
        let state: StateType[] = json.data.states
        setStateList(state[0]._id)
    }
    getStates()

    if (!adInfo) return false;

    return (
        <PageContainer>
            <div className="my-2 ml-3 text-sm md:ml-0 md:text-base">
                Você esta aqui:
                <Link className="px-1 hover:text-gray-500 hover:border-b hover:border-black" href='/'>Home</Link>
                /
                <Link className="px-1" href={`/ad/list?state=${adInfo.category._id}`}>{adInfo.stateName}</Link>
                /
                <Link className="px-1" href={`/ad/list?state=${stateList}&cat=${adInfo.category._id}`}>{adInfo.category.name}</Link>
                / {adInfo.title}
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 mr-5">
                    <div className="flex-1 max-w-3xl w-full ml-2 mr-5 bg-white rounded-md shadow-md mb-5 md:ml-0">
                        {loading && !adInfo ? (<div className="h-72 bg-gray-300"></div>) : (
                            <div className="max-w-sm max-h-lg w-full h-full p-1 ml-1 md:max-w-4xl md:ml-0">
                                <Slide>
                                    {adInfo.images.map((img, k) => (
                                        <div key={k} className="">
                                            <img src={img} alt="" className="flex items-center justify-center bg-cover w-full h-full rounded-md" />
                                        </div>
                                    ))}
                                </Slide>
                            </div>
                        )}
                        <div className="flex-1 flex flex-col justify-center ml-5">
                            {loading && !adInfo ? (<div className="h-5 bg-gray-300"></div>) : (
                                <div className="mb-5">
                                    <h2 className="text-2xl font-bold my-3">{adInfo.title}</h2>
                                    <p className="text-gray-400">Criado em {formatDate(adInfo.dateCreated)}</p>
                                </div>
                            )}
                            {loading && !adInfo ? (<div className="h-28 bg-gray-300"></div>) : (
                                <div className="">
                                    <p className="my-3 text-sm md:text-base">{adInfo.description}</p>
                                    <p className="my-3 text-gray-400">vizualizações: {adInfo.views}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-md shadow-md mx-3 mb-5 p-3 md:mx-0">
                        {loading && !adInfo ? (<div className="h-5 bg-gray-300"></div>) : (
                            <p className="">{adInfo.priceNegotiable ? 'Preço Negociavel' : (
                                <div className="">Preço: <span className="block text-3xl text-blue-500 font-bold">R$ {formatPrice(adInfo.price)}</span></div>
                            )}</p>
                        )}
                    </div>
                    {loading && !adInfo ? (<div className="h-14 bg-gray-300"></div>) : (
                        <a
                            href={`mailto:${adInfo.userInfor.email}`}
                            target="_blank"
                            className="bg-blue-500 text-white h-8 rounded-md shadow-lg flex items-center justify-center mx-3 mb-5 md:mx-0
                                hover:bg-blue-600 hover:transition-all hover:ease-in-out"
                        >Fale com o vendedor</a>
                    )}
                    <div className="bg-white rounded-md shadow-md mx-3 mb-5 p-3 md:mx-0">
                        {loading && !adInfo ? (<div className="h-14 bg-gray-300"></div>) : (
                            <div className="flex flex-col">
                                <strong className="text-xl">{adInfo.userInfor.name}</strong>
                                <span className="text-gray-400 mt-2">Email: {adInfo.userInfor.email}</span>
                                <span className="text-gray-400 mt-2">Estado: {adInfo.stateName}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                {adInfo.others &&
                    <>
                        <h2 className="text-2xl font-bold my-5 ml-3 md:ml-0">Outras ofertas do vendedor</h2>
                        <div className="flex flex-wrap gap-4">
                            {adInfo.others.map((i, k) => (
                                <Link key={k} href={`/ad/item?id=${i._id}`}>
                                    <AdItem data={i} />
                                </Link>

                            ))}
                        </div>
                    </>
                }
            </div>
        </PageContainer>
    );
}

export default Page;