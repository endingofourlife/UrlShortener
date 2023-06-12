import {Button, Input, Menu} from "semantic-ui-react";

export default function NavBar() {
    return (
        <>
            <Menu secondary>
                <Menu.Item>
                    Create Short URL
                </Menu.Item>
                <Menu.Item>
                    My Shortcuts
                </Menu.Item>
                <Menu.Item>
                    About
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button content='Login' color={"twitter"}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </>
    )
}