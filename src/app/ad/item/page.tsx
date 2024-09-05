'use client'

import { AdItem } from "@/components/AdItem";
import { PageContainer } from "@/components/PageContainer";
import { formatDate, formatPrice } from "@/helpers/formats";
import useApi from '@/helpers/OlxApi';
import { OneAdType } from "@/types/OneAdType";
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

    const id = searchParams.id;

    const [loading, setLoading] = useState<boolean>(true);
    const [adInfo, setAdInfo] = useState<OneAdType>();

    useEffect(() => {
        const getAdInfo = async (id: string) => {
            const json: AxiosResponse = await api.getOneAd(id, true);
            setAdInfo(json.data);
            setLoading(false);
        };
        getAdInfo(id)

    }, []);

    if (!adInfo) return false;

    return (
        <PageContainer>
            <div className="my-2">
                Você esta aqui:
                <Link className="px-1 hover:text-gray-500 hover:border-b hover:border-black" href='/'>Home</Link>
                /
                <Link className="px-1" href={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                /
                <Link className="px-1" href={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                / {adInfo.title}
            </div>
            <div className="flex">
                <div className="flex-1 mr-5">
                    <div className="flex-1 max-w-3xl w-full mr-5 bg-white rounded-md shadow-md mb-5">
                        {loading && !adInfo ? (<div className="h-72 bg-gray-300"></div>) : (
                            <div className="max-w-3xl max-h-xl w-full h-full p-1">
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
                                    <p className="my-3">{adInfo.description}</p>
                                    <p className="my-3 text-gray-400">vizualizações: {adInfo.views}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-md shadow-md mb-5 p-3">
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
                            className="bg-blue-500 text-white h-8 rounded-md shadow-lg flex items-center justify-center mb-5 hover:bg-blue-600 hover:shadow-2xl"
                        >Fale com o vendedor</a>
                    )}
                    <div className="bg-white rounded-md shadow-md mb-5 p-3">
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
                        <h2 className="text-2xl font-bold my-5">Outras ofertas do vendedor</h2>
                        <div className="flex gap-10">
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