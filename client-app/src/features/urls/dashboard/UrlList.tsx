import {UsersUrl} from "../../../app/models/UsersUrl";
import {Button, Item} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import agent from "../../../app/api/agent";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";


export default observer(function UrlList() {
    const {urlStore} = useStore();
    const {openUrlDetails, deleteUrl, urlsByDate, loading} = urlStore;
    const [target, setTarget] = useState("");

    function handleUrlDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteUrl(id);
    }

    return (
        <>
            <Item.Group divided>
                {urlsByDate.map((url, index) => (
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
                                <Button name={url.id} loading={loading && target===url.id} floated='right' content='Delete' color='red' onClick={(e)=>handleUrlDelete(e, url.id)} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </>
    )
})