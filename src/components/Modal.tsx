'use client'
import { UserContext } from '@/Contexts/UserContext';
import useApi from '@/helpers/OlxApi';
import { StateType } from '@/types/StateType';
import { UserType } from '@/types/UserType';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';

type Props = {
    closeModal: () => void;
    token: string
}

export const Modal = ({ closeModal, token }: Props) => {
    const api = useApi();
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [stateLoc, setStateLoc] = useState<string>('');
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [data, setData] = useState<Omit<UserType, 'ads'>>()

    useEffect(() => {
        const getStates = async () => {
            const slist: AxiosResponse = await api.getStates();
            setStateList(slist.data.states);
        }
        getStates();
    }, []);

    const attUser = async () => {
        if (data) {
            data.name = name;
            data.email = email;
            data.state = stateLoc;
        }
        const json = await api.editUser(token, data);
        console.log(json.data)

        closeModal();
    }

    return (
        <>
            <div
                className="fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center rounded- bg-black/90"
            >
                <div className="flex flex-col rounded-lg bg-gray-300">
                    <div className="flex m-5">
                        <p className="mr-3 mt-1 font-bold">Nome: </p>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            name="name"
                            type="text"
                            className="border border-gray-500 py-1 px-3 rounded-lg"
                        />
                    </div>
                    <div className="flex m-5">
                        <p className="mr-3 mt-1 font-bold">E-mail: </p>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            className="border border-gray-500 py-1 px-3 rounded-lg"
                        />
                    </div>
                    <div className="flex m-5">
                        <p className="mr-3 mt-1 font-bold">Estado: </p>
                        <select
                            name="state"
                            className=" w-14 text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800"
                            value={stateLoc}
                            onChange={e => setStateLoc(e.target.value)}
                        >
                            <option value=""></option>
                            {stateList.map((i, k) => (
                                <option key={k} value={i._id}>{i.name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={attUser} className="border border-gray-300 text-white ml-4 px-3 py-2 my-4 max-w-36 rounded-lg bg-blue-500
                        hover:bg-blue-700 hover:transition-all hover:ease-in-out">Enviar</button>
                </div>
            </div>
        </>
    );
}