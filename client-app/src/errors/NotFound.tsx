import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'>
                    Opps - we've looked everywhere but could not find what you are looking for!
                </Icon>
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/urls'>
                    Return to urls page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}