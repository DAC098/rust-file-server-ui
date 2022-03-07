import { MenuItem, Overlay, Portal } from "@blueprintjs/core";
import React, { useRef } from "react"

interface AddFileProps {}

const AddFile = ({}: AddFileProps) => {
    let file_ref = useRef<HTMLInputElement>(null);

    return <>
        <input ref={file_ref} type={"file"} multiple style={{display: "none"}} onChange={(ev) => {
            console.log(ev.target.files);
        }}/>
        <MenuItem icon="document" text="Add File" onClick={() => {
            file_ref.current.click();
        }}/>
        <Overlay isOpen={true}>
            <div style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "300px",
                height: "300px",
            }}>
                file list
            </div>
        </Overlay>
    </>
}

export default AddFile;