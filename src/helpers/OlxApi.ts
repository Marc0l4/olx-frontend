import { api } from '@/libs/axios/axios'

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
    getAds: async (options: { sort: string, limit: number }) => {
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
    addAd: async (data: FormData) => {
        const json = await api.post('/ad/add', {
            data
        })
        return json;
    }
}

export default () => OlxApi;