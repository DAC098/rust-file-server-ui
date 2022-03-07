import React from "react"
import { BaseFsItem } from "../types"
import { bytes_to_unit_string, date_to_string, epoch_to_date } from "../util"
import UserDataView from "./UserDataView"

interface DetailsViewProps {
    fs_item: BaseFsItem
}

const DetailsView = ({fs_item}: DetailsViewProps) => {
    let size_str = "";
    let created_str = date_to_string(epoch_to_date(fs_item.created));
    let modified_str = "";

    if (fs_item.item_size > 0) {
        size_str = bytes_to_unit_string(fs_item.item_size);
    }

    if (fs_item.modified != null) {
        modified_str = date_to_string(epoch_to_date(fs_item.modified));
    }

    return <div style={{padding: "4px"}}>
        <div>
            {fs_item.is_root ?
                "root directory"
                :
                <><span>name</span>: {fs_item.basename}</>
            }
        </div>
        <div><span>id</span>: {fs_item.id.toString()}</div>
        <div><span>created</span>: {created_str}</div>
        <div><span>modified</span>: {modified_str}</div>
        <div><span>size</span>: {size_str}</div>
        <div><span>exists</span>: {fs_item.item_exists ? "Yes" : "No"}</div>
        <div><UserDataView user_data={fs_item.user_data}/></div>
    </div>
}

export default DetailsView;