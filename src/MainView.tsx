import React from "react"
import { Route, Routes } from "react-router-dom"
import FsView from "./FsView"

const MainView = () => {
    return <div style={{
        position: "relative",
        width: "100%", height: "100%"
    }}>
        <Routes>
            <Route path="fs">
                <Route path="*" element={<FsView/>}/>
                <Route index element={<FsView/>}/>
            </Route>
            <Route index element={<div>
                index route
            </div>}/>
        </Routes>
    </div>
}

export default MainView;