import { Button, Modal } from "semantic-ui-react";
import { UsersUrl } from "../../../app/models/UsersUrl";

interface Props {
    url: UsersUrl;
    onClose: () => void;
}

export default function UrlDetails({ url, onClose }: Props) {
    return (
        <>
            <Modal open={true} onClose={onClose}>
                <Modal.Header>{url.originalUrl}</Modal.Header>
                <Modal.Content>
                    {/* Display additional information about the URL */}
                    <p>Created Date: {url.createdDate}</p>
                    <p>Short URL: {url.shortUrl}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={onClose}>Close</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
