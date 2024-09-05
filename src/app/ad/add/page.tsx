'use client'

import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { AddAdInput } from "@/types/Inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from '@/helpers/OlxApi';
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/ErrorMessage";
import { AxiosResponse } from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { AddAdFormSchema } from "@/libs/zod/AddAdFormSchema";
import { CatType } from "@/types/CatType";

const Page = () => {
    const api = useApi();
    const router = useRouter();
    const ctx = useContext(UserContext)

    const fileField: any = useRef();

    if (!ctx) return false;
    if (!ctx.token) return router.push('/user/signin');

    const { handleSubmit, register, formState: { errors } } = useForm<AddAdInput>({
        resolver: zodResolver(AddAdFormSchema)
    });

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState<number>(0);
    const [priceNegociable, setPriceNegotiable] = useState<boolean>(false);
    const [desc, setDesc] = useState<string>('');
    const [categories, setCategories] = useState<CatType[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getCategories = async () => {
            const json: AxiosResponse = await api.getCategories();
            setCategories(json.data.categories);
        }
        getCategories();
    }, []);

    const handleFormSubmit: SubmitHandler<AddAdInput> = async (data) => {
        setDisabled(true);
        setError('');
        let errors = [];

        if (!title.trim()) errors.push('Sem Titulo');
        if (!category) errors.push('Sem Categoria');
        if (errors.length >= 1) setError(errors.join("\n"));

        const fData = new FormData();
        fData.append('title', title);
        fData.append('price', price.toString());
        fData.append('priceneg', priceNegociable.toString());
        fData.append('desc', desc);
        fData.append('cat', category);
        fData.append('token', ctx.userToken);

        if (fileField.current.files.length <= 0) {
            errors.push('Imagem é obrigatorio')
        } else {
            for (let i in fileField.current.files.length) {
                fData.append('image', fileField.current.files[i])
            }
            const json: AxiosResponse = await api.addAd(fData);
            console.log(json);
        }
    }

    return (
        <PageContainer>
            <PageTitle title={'Adicionar um anuncio'} />
            {error &&
                <ErrorMessage error='Algo deu errado' />
            }
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-xl shadow-sm shadow-gray-500 py-3 mt-3 max-w-xl w-full">
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Titulo</div>
                        <div className="flex-1">
                            <input
                                {...register('title')}
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                    ${errors.title && 'outline-red-600 border-red-600'}
                                    `}
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                disabled={disabled}
                            />
                            {errors.title && <p className="text-red-600 mt-1">{errors.title.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Categoria</div>
                        <div className="flex-1">
                            <select
                                name="category"
                                className=" w-32 text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                disabled={disabled}
                            >
                                <option value=""></option>
                                {categories.map((i, k) => (
                                    <option key={k} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Preço</div>
                        <div className="flex-1">
                            <input
                                {...register('price')}
                                className={`place-content-start placeholder: w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                    ${errors.price && 'outline-red-600 border-red-600'}
                                    `}
                                type="text"
                                placeholder="R$ "
                                onChange={e => setPrice(parseInt(e.target.value))}
                                disabled={disabled}
                            />
                            {errors.price && <p className="text-red-600 mt-1">{errors.price.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Preço Negociavel?</div>
                        <div className="flex-1">
                            <input
                                type="checkbox"
                                className=""
                                disabled={disabled}
                                checked={priceNegociable}
                                onChange={() => setPriceNegotiable(!priceNegociable)}
                            />
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Descrição</div>
                        <div className="flex-1">
                            <textarea
                                {...register('desc')}
                                className={`h-36 resize-none w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                        ${errors.desc && 'outline-red-600 border-red-600'}
                                    `}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                disabled={disabled}
                            ></textarea>
                            {errors.desc && <p className="text-red-600 mt-1">{errors.desc.message}</p>}
                        </div>
                    </label>
                    <label className="flex items-center p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm">Imagens (1 ou mais)</div>
                        <div className="flex-1">
                            <input
                                type='file'
                                className={`w-full text-sm p-1 border border-gray-200 outline-none rounded-md focus:border-gray-800
                                        ${errors.desc && 'outline-red-600 border-red-600'}
                                    `}
                                ref={fileField}
                                multiple
                                disabled={disabled}
                            />
                        </div>
                    </label>
                    <label className="flex ml-16 p-3 max-w-lg">
                        <div className="w-40 text-right pr-5 font-bold text-sm"></div>
                        <div className="flex-1">
                            <button disabled={disabled} className="rounded-md text-white bg-blue-500 py-2 px-3 hover:bg-blue-700">Adicionar Anuncio</button>
                        </div>
                    </label>
                </form>
            </div>
        </PageContainer>
    );
}

export default Page;