import { formatPrice } from "@/helpers/formats";
import { AdsType } from "@/types/AdType";
import Link from "next/link";

type Props = {
    data: AdsType
}

export const AdItem = ({ data }: Props) => {
    if (!data) return false

    return (
        <Link className="block border max-w-48 w-full border-white bg-white p-3 rounded-md hover:shadow-2xl 
            md:max-w-52
            hover:bg-gray-50 hover:transition-all hover:ease-linear" href={`/ad/item?id=${data._id}`}>
            <div className="">
                <img src={data.image} alt={data.title} className="w-full rounded-md" />
            </div>
            <h1 className="font-bold">{data.title}</h1>
            <div className="">{data.priceNegotiable ? 'Preço a Negociar' : `R$ ${formatPrice(data.price)}`}</div>
        </Link>
    );
}