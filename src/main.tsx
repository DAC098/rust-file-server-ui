import React from "react";
import {render} from "react-dom";
import { Classes, Colors } from "@blueprintjs/core";
import { classes } from "./util";

import "./request";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./LoginView";
import MainView from "./MainView";
import { Provider } from "react-redux";
import { store } from "./state/store";

document.addEventListener("DOMContentLoaded", e => {
    render(
        <div className={classes(Classes.DARK)} style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: Colors.DARK_GRAY2
        }}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth/session" element={<Login/>}/>
                        <Route path="/*" element={<MainView/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>,
        document.getElementById("root")
    )
}, {once: true})