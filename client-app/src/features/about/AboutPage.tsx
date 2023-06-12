import {Container} from "semantic-ui-react";

export default function AboutPage() {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>About page</h1>
            <p>The URL Shortener project aims to create an application that can shorten any URL and provide a shortened equivalent for easy navigation.
                The project includes several views, such as the Login view,
                Short URLs Table view, My shortcuts view, and About view.
            </p>
            <p style={{color:"red"}}>
                Please note that the login functionality and user roles/permissions, my shortcuts have not been implemented yet.
            </p>
        </Container>
    )
}