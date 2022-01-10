import React from "react";
import {render} from "react-dom";
import { Classes, Colors } from "@blueprintjs/core";
import { classes } from "./util";
import { Header } from "./Header";

import "./request"

document.addEventListener("DOMContentLoaded", e => {
    render(
        <div className={classes(Classes.DARK)} style={{
            width: "100vw",
            height: "100vh",
            padding: "8px",
            backgroundColor: Colors.DARK_GRAY2
        }}>
            <Header/>
        </div>,
        document.getElementById("root")
    )
}, {once: true})