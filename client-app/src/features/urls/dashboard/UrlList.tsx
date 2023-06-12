import {UsersUrl} from "../../../app/models/UsersUrl";
import {Button, Item} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import agent from "../../../app/api/agent";
import {useStore} from "../../../app/stores/store";

interface Props{
    urls: UsersUrl[];
    openUrlDetails: (url: UsersUrl) => void;
    deleteUrl: (id: string) => void;
}

export default function UrlList({urls, openUrlDetails, deleteUrl }: Props) {

    return (
        <>
            <Item.Group divided>
                {urls.map((url, index) => (
                    <Item key={url.id}>
                        <Item.Content>
                            <Item.Header>{index + 1}. {url.originalUrl}</Item.Header>
                            <Item.Description>
                                <div className="url-details">
                                    <div className="url-date">{url.createdDate}</div>
                                    <div className="url-arrow">➡</div>
                                    <div className="url-short">{url.shortUrl}</div>
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={()=>openUrlDetails(url)} />
                                <Button floated='right' content='Delete' color='red' onClick={()=>deleteUrl(url.id)} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </>
    )
}