export type SignInInputs = {
    email: string;
    password: string;
}

export type SignUpInputs = {
    name: string;
    state: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type AddAdInput = {
    title: string;
    category: string;
    price: string;
    priceNegotiable: boolean;
    desc: string;
}