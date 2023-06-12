import {createContext, useContext} from "react";
import UrlStore from "./UrlStore";


interface Store{
    urlStore: UrlStore;
}

export const store: Store = {
    urlStore: new UrlStore()
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
