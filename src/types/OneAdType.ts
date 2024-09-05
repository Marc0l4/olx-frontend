import { AdsType } from "./AdType"

export type OneAdType = {
    category: { _id: string, name: string, slug: string };
    dateCreated: string;
    description: string;
    id: string;
    images: string[];
    others: [AdsType];
    price: number;
    priceNegotiable: boolean;
    stateName: string;
    title: string;
    userInfor: { name: string, email: string };
    views: number;
}