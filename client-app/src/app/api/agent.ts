import axios, {Axios, AxiosResponse} from "axios";
import {UsersUrl} from "../models/UsersUrl";


axios.defaults.baseURL='http://localhost:5000/api';

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
    create: (url: UsersUrl) => axios.post<void>('/Url/', url),
    delete: (id: string) => axios.delete<void>(`/Url/${id}`),
    deleteAll: () => axios.delete<void>('/Url')
};

const agent = {
    Urls
}

export default agent;