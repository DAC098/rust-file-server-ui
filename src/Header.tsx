import { Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import React from "react";

export function Header(props: any) {
    return <Navbar>
        <NavbarGroup>
            <NavbarHeading>rust-file-server-ui</NavbarHeading>
            <NavbarDivider/>
            <Button className={Classes.MINIMAL} icon="home" text="Home"/>
            <Button className={Classes.MINIMAL} icon="settings" text="Settings"/>
        </NavbarGroup>
    </Navbar>
}