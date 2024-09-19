import { api } from '@/libs/axios/axios'
import { AddAd } from '@/types/AddAd';
import { UserType } from '@/types/UserType';

const OlxApi = {
    login: async (email: string, password: string) => {
        const json = await api.post('/user/signin', {
            email,
            password
        });
        return json;
    },
    register: async (name: string, email: string, password: string, state: string) => {
        const json = await api.post('/user/signup', {
            name,
            email,
            password,
            state
        });
        return json;
    },
    getStates: async () => {
        const json = await api.get('/states');
        return json;
    },
    getCategories: async () => {
        const json = await api.get('/categories');

        return json;
    },
    getAds: async (options: {}) => {
        const json = await api.get('ad/list', {
            params: { options }
        });
        return json;
    },
    getOneAd: async (id: string, other: boolean) => {
        const json = await api.get('/ad/item', {
            params: { id, other }
        });
        return json;
    },
    addAd: async (data: FormData, token: string) => {
        const json = await api.post('/ad/add', {
            body: { data },
            params: { token }
        })
        return json;
    },
    getUser: async (token: string) => {
        const json = await api.get('/user/me', { params: { token } });
        return json;
    },
    editUser: async (token: string, data?: UserType) => {
        const json = await api.put('/user/me', {
            body: {
                token,
                name: data?.name,
                email: data?.email,
                state: data?.state
            }
        })
        return json;
    }
}

export default () => OlxApi;