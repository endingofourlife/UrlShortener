import {makeAutoObservable, runInAction} from "mobx";
import {UsersUrl} from "../models/UsersUrl";
import agent from "../api/agent";
import {CreateUrlDto} from "../models/Dto/CreateUrlDto";
import {v4 as uuid} from "uuid";

export default class UrlStore{
    urlRegistry = new Map<string, UsersUrl>();
    loading = false;
    loadingInitial = false;
    selectedUrl: UsersUrl | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get urlsByDate(){
        return Array.from(this.urlRegistry.values()).sort((a,b) =>
            Date.parse(a.createdDate) - Date.parse(b.createdDate));
    }

    openUrlDetails = (url: UsersUrl) => {
        this.selectedUrl = url;
    }
    closeUrlDetails = () => {
        this.selectedUrl = null;
    }

    loadUrls = async () => {
        this.setLoadingInitial(true);
        try {
            const urls = await agent.Urls.list();
                urls.forEach(url => {
                    url.createdDate = url.createdDate.split('T')[0];
                    this.urlRegistry.set(url.id, url);
                })
            this.setLoadingInitial(false);
        }catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createUrl = async (url: CreateUrlDto) => {
        this.loading = true;
        try {
            await agent.Urls.create(url);
            runInAction(()=>{
                const correctUrl:UsersUrl = {
                    id: uuid(),
                    originalUrl: url.originalUrl,
                    shortUrl: url.shortUrl,
                    createdDate: new Date().toISOString().split('T')[0],
                    userId: url.userId
                }
                this.urlRegistry.set(correctUrl.id, correctUrl);
                this.loading = false;
            })
        }catch (e) {
            console.log(e);
            runInAction(()=>{
               this.loading = false;
            });
        }
    }
    deleteUrl = async(id: string) => {
        this.loading = true;
        try{
            await agent.Urls.delete(id);
            runInAction(()=>{
                this.urlRegistry.delete(id);
                this.loading = false;
            });
        }catch(e){
            console.log(e);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    deleteAllUrls = async() => {
        this.loading = true;
        try{
            await agent.Urls.deleteAll();
            runInAction(()=>{
                this.urlRegistry = new Map<string, UsersUrl>();
                this.loading = false;
            });
        }catch(e){
            console.log(e);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}