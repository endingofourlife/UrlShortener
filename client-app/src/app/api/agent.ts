import axios, {Axios, AxiosResponse} from "axios";
import {UsersUrl} from "../models/UsersUrl";
import {CreateUrlDto} from "../models/Dto/CreateUrlDto";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL='http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
})

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