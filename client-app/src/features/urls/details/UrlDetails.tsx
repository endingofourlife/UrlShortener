import { Button, Modal } from "semantic-ui-react";
import { UsersUrl } from "../../../app/models/UsersUrl";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";

interface Props {
    url: UsersUrl;
}

export default observer(function UrlDetails() {
    const {urlStore} = useStore();
    const {closeUrlDetails, selectedUrl} = urlStore;
    return (
        <>
            <Modal open={true} onClose={closeUrlDetails}>
                <Modal.Header>{selectedUrl?.originalUrl}</Modal.Header>
                <Modal.Content>
                    {/* Display additional information about the URL */}
                    <p>Created Date: {selectedUrl?.createdDate}</p>
                    <p>Short URL: {selectedUrl?.shortUrl}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={closeUrlDetails}>Close</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
)