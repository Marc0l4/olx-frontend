'use client'

import { PageContainer } from "@/components/PageContainer";
import { UserContext } from "@/Contexts/UserContext";
import { UserType } from "@/types/UserType";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useApi from '@/helpers/OlxApi';
import { AxiosResponse } from "axios";
import { AdItem } from "@/components/AdItem";
import { AdsType } from "@/types/AdType"; import { Modal } from "@/components/Modal";
;

const Page = () => {
    const api = useApi();
    const router = useRouter();
    const ctx = useContext(UserContext)

    if (!ctx) return false;
    if (!ctx.token) return router.push('/user/signin');

    const [user, setUser] = useState<UserType>();
    const [ad, setAd] = useState<AdsType[]>();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const json: AxiosResponse = await api.getUser(ctx.token);
            setUser(json.data)
            console.log(json.data)
            if (user?.ads) {
                for (let i in user.ads) {
                    setAd([{
                        _id: user.ads[i].id,
                        image: user.ads[i].images[0],
                        price: user.ads[i].price,
                        priceNegotiable: user.ads[i].priceNegotiable,
                        title: user.ads[i].title
                    }])
                }
            }
        }
        getUser();
    }, [])

    const openModal = () => {
        setModal(false)
    }

    return (
        <PageContainer>
            <div className="flex justify-center items-center ">
                <div className="bg-white rounded-xl shadow-sm shadow-gray-500 p-3 mx-3 mt-3 max-w-lg w-full md:mx-0">
                    <h1 className="text-xl font-semibold text-center">Dados do Usuario</h1>
                    <p className="p-2 font-bold">Nome: <span className="font-normal ml-2">{user?.name}</span></p>
                    <p className="p-2 font-bold">E-mail: <span className="font-normal ml-2">{user?.email}</span></p>
                    <p className="p-2 font-bold">Estado: <span className="font-normal ml-2">{user?.state}</span></p>
                    <button onClick={() => setModal(true)} className="border border-white text-white px-3 py-2 my-4 rounded-lg bg-blue-500
                        hover:bg-blue-700 hover:transition-all hover:ease-in-out">Editar dados pessoais</button>
                </div>
                {modal &&
                    <div className="">
                        <Modal closeModal={openModal} token={ctx.token} />
                    </div>
                }
                {ad && ad.map((i, k) => (
                    <div className="">
                        <AdItem key={k} data={i} />
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}

export default Page;