import React from "react"
import { FileFsItem } from "../../types"
import ImageView from "./ImageView"
import PlainTextView from "./PlainTextView"

const image_extensions = [
    "jpg","jpeg",
    "png",
    "gif",
    "svg",
    "webp",
    "ico"
];

const plain_text_extensions = [
    "txt",
    "html",
    "css",
    "js",
    "json"
];

interface FsFileProps {
    file: FileFsItem,
    location: string
}

const FileView = ({file, location}: FsFileProps) => {
    let ext = null;
    let ext_index = file.basename.lastIndexOf(".");

    if (ext_index > 0) {
        ext = file.basename.substring(ext_index + 1).toLocaleLowerCase();
    }

    if (image_extensions.includes(ext)) {
        return <ImageView fs_item={file} location={location}/>
    } else if (plain_text_extensions.includes(ext)) {
        return <PlainTextView fs_item={file} location={location}/>
    } else {
        return <>no preview for file</>
    }
}

export default FileView;