import axios, {Axios, AxiosError, AxiosResponse} from "axios";
import {UsersUrl} from "../models/UsersUrl";
import {CreateUrlDto} from "../models/Dto/CreateUrlDto";
import {toast} from "react-toastify";
import {router} from "../router/Routes";
import {store} from "../stores/store";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL='http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if (data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error('bad request')
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
    deleteAll: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Urls = {
    list: () => requests.get<UsersUrl[]>('/Url'),
    details: (id: string) => requests.get<UsersUrl>(`/Url/${id}`),
    create: (url: CreateUrlDto) => axios.post<void>('/Url/', url),
    delete: (id: string) => axios.delete<void>(`/Url/${id}`),
    deleteAll: () => axios.delete<void>('/Url')
};

const agent = {
    Urls
}

export default agent;