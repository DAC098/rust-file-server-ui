import { ResizeSensor2 } from "@blueprintjs/popover2";
import React, { useEffect, useRef, useState } from "react";
import LoadingOverlay from "../../LoadingOverlay";
import { FileFsItem } from "../../types";

function minAspectRatio(width: number, height: number, max_width: number, max_height: number) {
    console.log({width,height,max_width,max_height});
    let min = Math.min(max_width / width, max_height / height);

    return {width: width * min, height: height * min};
}

interface ImageViewProps {
    fs_item: FileFsItem
    location: string
}

const ImageView = ({fs_item, location}: ImageViewProps) => {
    let url = location + "?action=download"
    let div_ref = useRef<HTMLDivElement>(null);
    let img_ref = useRef<HTMLImageElement>(null);
    let [display, setDisplay] = useState(false);
    let [zoom_fit, setZoomFit] = useState(true);
    let [img_dim, setImgDim] = useState({width: 0, height: 0});

    return <ResizeSensor2 targetRef={div_ref} onResize={(entries) => {
        console.log(entries);
    }}>
        <div
            ref={div_ref}
            style={{
                position: "relative",
                width: "100%", height: "100%"
            }}
        >
            {!display ?
                <LoadingOverlay/>
                :
                null
            }
            <img
                ref={img_ref}
                src={url} 
                style={{
                    position: "relative",
                    display: display ? "" : "none",
                    width: img_dim.width, 
                    height: img_dim.height,
                }} 
                onLoad={() => {
                    setDisplay(true);
                    setImgDim(minAspectRatio(
                        img_ref.current.naturalWidth,
                        img_ref.current.naturalHeight,
                        div_ref.current.offsetWidth, 
                        div_ref.current.offsetHeight
                    ));
                }}
            />
        </div>
    </ResizeSensor2>
}

export default ImageView;