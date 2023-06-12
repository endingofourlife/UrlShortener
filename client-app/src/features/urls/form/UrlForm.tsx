import {Segment, Form, Button} from "semantic-ui-react";
import {ChangeEvent, useState} from "react";
import {UsersUrl} from "../../../app/models/UsersUrl";
import {CreateUrlDto} from "../../../app/models/Dto/CreateUrlDto";

interface Props {
    createUrl: (url: CreateUrlDto) => void;
}

export function UrlForm({createUrl}: Props) {
    const initialState: CreateUrlDto = {
        originalUrl: '',
        shortUrl: '',
        userId: '',
    };
    const [url, setUrl] = useState(initialState);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUrl({...url, [name]: value})
    }
    function handleSubmit(){
        createUrl(url);
    }
    return (
        <Segment floated='right' clearing>
            <Form>
                <p style={{fontSize:"24px"}}>Create short url</p>
                <Form.Input placeholder='Original Url' name='originalUrl' onChange={handleInputChange}/>
                <Form.Input placeholder='Short Url' name='shortUrl' onChange={handleInputChange}/>
                <Form.Input placeholder='User id' name='userId' onChange={handleInputChange}/>
                <Button positive type='submit' content='Submit' onClick={handleSubmit}/>
            </Form>
        </Segment>
    )
}