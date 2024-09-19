export type AddAd = {
    token: string;
    title: string;
    price: string;
    priceneg: boolean;
    desc: string;
    cat: string;
    image: [{ url: string, default: boolean }];
}