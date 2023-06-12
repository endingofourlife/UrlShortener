import {makeAutoObservable, makeObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {UsersUrl} from "../models/UsersUrl";

export default class UrlStore{
    urlRegistry = new Map<string, UsersUrl>();

    constructor(){
        makeAutoObservable(this)
    }

    private getUrl = (id: string) => {
        return this.urlRegistry.get(id);
    }

    loadUrls = async () => {
        try{
            const urls = await agent.Urls.list();
            urls.forEach(url => {
                this.urlRegistry.set(url.id, url);
            })
        }catch(e){
            console.error(e);
        }
    }

    createUrl = async (url: UsersUrl) => {
        try{
            await agent.Urls.create(url);
            runInAction(()=>{
                this.urlRegistry.set(url.id, url);
            });
        }catch (error){
            console.log(error);
        }
    }

    deleteUrl = async (id: string) => {
        try{
            await agent.Urls.delete(id);
            runInAction(() => {
                this.urlRegistry.delete(id);
            });
        } catch (e) {
            console.log(e);
        }
    }
}