import { AdsType } from "./AdType"

export type OneAdType = {
    id: string;
    category: { _id: string, name: string, slug: string };
    dateCreated: string;
    description: string;
    images: [string];
    others: [AdsType];
    price: number;
    priceNegotiable: boolean;
    stateName: string;
    title: string;
    userInfor: { name: string, email: string };
    views: number;
}