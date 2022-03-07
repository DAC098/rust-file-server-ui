import React from "react";
import { Spinner } from "@blueprintjs/core";

const LoadingOverlay = () => {
    return <div style={{
        position: "absolute", 
        top: 0, left: 0, 
        width: "100%", height: "100%", 
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }}>
        <div style={{
            position: "absolute",
            display: "flex",
            flexFlow: "column nowrap",
            gap: "8px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
        }}>
            <Spinner size={50}/>
            <span>
                Loading
            </span>
        </div>
    </div>
}

export default LoadingOverlay;