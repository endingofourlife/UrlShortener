import {Button, Input, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <Menu secondary>
                <Menu.Item as={NavLink} to={'/urls'}>
                    Create Short URL
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/MyShortcuts'}>
                    My Shortcuts
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/about'}>
                    About
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item as={NavLink} to={'/login'}>
                        <Button content='Login' color={"twitter"}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </>
    )
}