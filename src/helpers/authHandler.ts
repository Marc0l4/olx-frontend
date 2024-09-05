import { getCookie, setCookie } from "cookies-next";

export let haveCookie = () => {
    let token = getCookie('token');
    return (token) ? true : false;
}

export const login = (token: string, permanent: boolean) => {
    let expiresCookie = new Date('12/12/2099')

    if (permanent) {
        setCookie('token', token, { expires: expiresCookie });
    } else {
        setCookie('token', token);
    }
    return true;
}

