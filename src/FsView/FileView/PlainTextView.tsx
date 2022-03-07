import React from "react";
import { FileFsItem } from "../../types";

interface PlainTextViewProps {
    fs_item: FileFsItem,
    location: string
}

const PlainTextView = ({fs_item, location}: PlainTextViewProps) => {
    return <div>
        plain text view
    </div>
}

export default PlainTextView;