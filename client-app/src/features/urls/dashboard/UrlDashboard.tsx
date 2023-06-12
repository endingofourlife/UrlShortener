import {Button, Grid, List} from "semantic-ui-react";
import {UsersUrl} from "../../../app/models/UsersUrl";
import React, {useEffect, useState} from "react";
import UrlList from "./UrlList";
import UrlDetails from "../details/UrlDetails";
import {useStore} from "../../../app/stores/store";
import {UrlForm} from "../form/UrlForm";
import {CreateUrlDto} from "../../../app/models/Dto/CreateUrlDto";

interface Props{
    urls: UsersUrl[];
    createUrl: (url: CreateUrlDto) => void;
    deleteUrl: (id: string) => void;
    deleteAllUrls: () => void;
}


export default function UrlDashboard({urls, createUrl, deleteUrl, deleteAllUrls}: Props) {
    const [selectedUrl, setSelectedUrl] = useState<UsersUrl | null>(null);

    const openUrlDetails = (url: UsersUrl) => {
        setSelectedUrl(url);
    };

    const closeUrlDetails = () => {
        setSelectedUrl(null);
    };

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <div className="table-container">
                    <UrlList urls={urls} openUrlDetails={openUrlDetails} deleteUrl={deleteUrl}/>
                </div>
            </Grid.Column>
            <div className="form-container" style={{paddingTop: '13px'}}>
                <UrlForm createUrl={createUrl} />
            </div>
            <div className='delete-container' style={{paddingTop: '11.5rem'}} onClick={deleteAllUrls}>
                <Button content='Delete All' color='red' onClick={deleteAllUrls} />
            </div>
            {selectedUrl && (
                <UrlDetails url={selectedUrl} onClose={closeUrlDetails} />
            )}
        </Grid>
    )
}


/*
*     // const [selectedUrl, setSelectedUrl] = useState<UsersUrl | null>(null);
    // const { urlStore } = useStore();
    //

    //
    // useEffect(() => {
    //     urlStore.loadUrls(); // Загрузка URL'ов при инициализации компонента
    // }, [urlStore]);

*
*
*
            <Grid centered>
                <Grid.Column width={10}>
                    <div className="table-container">

                        <UrlList urls={urls} openUrlDetails={openUrlDetails}  />
                    </div>
                </Grid.Column>
                {selectedUrl && (
                    <UrlDetails url={selectedUrl} onClose={closeUrlDetails} />
                )}
            </Grid>
* */