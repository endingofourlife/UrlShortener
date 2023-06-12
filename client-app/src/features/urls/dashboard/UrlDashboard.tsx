import {Button, Grid, List} from "semantic-ui-react";
import {UsersUrl} from "../../../app/models/UsersUrl";
import React, {useEffect, useState} from "react";
import UrlList from "./UrlList";
import UrlDetails from "../details/UrlDetails";
import {useStore} from "../../../app/stores/store";

import {CreateUrlDto} from "../../../app/models/Dto/CreateUrlDto";
import {observer} from "mobx-react-lite";
import UrlForm from "../form/UrlForm";
import LoadingComponent from "../../../app/layout/LoadingComponent";



export default observer(function UrlDashboard() {
    const {urlStore} = useStore();
    const {selectedUrl, deleteAllUrls} = urlStore;

    useEffect(()=>{
        urlStore.loadUrls();
    }, [urlStore]);


    if (urlStore.loadingInitial) return <LoadingComponent/>

    return (
        <Grid centered>
            <Grid.Column width={10}>
                <div className="table-container">
                    <UrlList />
                </div>
            </Grid.Column>
            <div className="form-container" style={{paddingTop: '13px'}}>
                <UrlForm />
            </div>
            <div className='delete-container' style={{paddingTop: '11.5rem'}} >
                <Button content='Delete All' color='red' onClick={deleteAllUrls} />
            </div>
            {selectedUrl && (
                <UrlDetails />
            )}
        </Grid>
    )
})