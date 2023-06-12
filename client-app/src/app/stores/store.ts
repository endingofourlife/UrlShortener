import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UrlStore from "./urlStore";



interface Store{
    urlStore: UrlStore;
    commonStore: CommonStore;
}

export const store: Store = {
    urlStore: new UrlStore(),
    commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
