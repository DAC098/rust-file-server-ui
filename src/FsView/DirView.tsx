import { Colors } from "@blueprintjs/core"
import { Cell, Column, SelectionModes, Table2 } from "@blueprintjs/table"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DirFsItem} from "../types"
import { bytes_to_unit_string, date_to_string, epoch_to_date } from "../util"

interface DirViewProps {
    location: string
    directory: DirFsItem
}

const DirView = ({directory, location}: DirViewProps) => {
    let [selected_items, setSelectedItems] = useState<{[key: string]: boolean}>({});
    let running_total = 0;
    let selected_count = 0;
    let table_content = [];
    let count = 0;

    if (directory.contents.length === 0) {
        table_content.push(<tr>
            <td colSpan={4} style={{
                padding: "2px 0 4px"
            }}>No known contents in directory</td>
        </tr>)
    } else {
        for (let item of directory.contents) {
            let url = location;
    
            if (url[url.length - 1] !== "/") {
                url += "/";
            }
    
            url += item.basename;
            running_total += item.item_size;
            count += 1;
    
            let bottom = "2px";
            let is_selected = selected_items[item.id.toString()] ?? false;
    
            if (count === directory.contents.length) {
                bottom = "4px";
            }

            if (is_selected) {
                selected_count += 1;
            }
    
            table_content.push(<tr key={item.id.toString()}>
                <td style={{padding: `2px 8px ${bottom}`}}>
                    <input type={"checkbox"} checked={is_selected} onChange={(ev) => {
                        setSelectedItems(v => {
                            let rtn = {...v};
                            rtn[item.id.toString()] = !(v[item.id.toString()] ?? false);

                            return rtn;
                        });
                    }}/>
                </td>
                <td style={{padding: `2px 8px ${bottom}`}}><Link to={url}>
                    {item.basename}
                </Link></td>
                <td style={{padding: `2px 8px ${bottom}`}}>{date_to_string(epoch_to_date(item.created))}</td>
                <td style={{padding: `2px 8px ${bottom}`}}>{item.modified != null ? date_to_string(epoch_to_date(item.modified)) : "" }</td>
                <td style={{padding: `2px 0 ${bottom} 8px`}}>{item.item_size > 0 ? bytes_to_unit_string(item.item_size) : "" }</td>
            </tr>);
        }
    }

    useEffect(() => {
        setSelectedItems({});
    }, [directory.id]);

    return <div style={{
        position: "relative",
        display: "flex",
        flexFlow: "column nowrap",
        minHeight: "100%"
    }}>
        <table style={{flex: "0", borderCollapse: "collapse", textAlign: "left"}}>
            <thead>
                <tr>
                    <th style={{
                        position: "sticky", top: 0,
                        padding: "4px 8px 2px",
                        backgroundColor: Colors.DARK_GRAY5
                    }}>
                        <input type={"checkbox"} onChange={() => {}}/>
                    </th>
                    <th style={{
                        position: "sticky", top: 0,
                        padding: "4px 8px 2px",
                        backgroundColor: Colors.DARK_GRAY5
                    }}>Name</th>
                    <th style={{
                        position: "sticky", top: 0,
                        padding: "4px 8px 2px",
                        backgroundColor: Colors.DARK_GRAY5
                    }}>Created</th>
                    <th style={{
                        position: "sticky", top: 0,
                        padding: "4px 8px 2px",
                        backgroundColor: Colors.DARK_GRAY5
                    }}>Modified</th>
                    <th style={{
                        position: "sticky", top: 0,
                        padding: "4px 8px 2px",
                        backgroundColor: Colors.DARK_GRAY5
                    }}>Size</th>
                </tr>
            </thead>
            <tbody>
                {table_content}
            </tbody>
        </table>
        <div style={{flex: "1"}}></div>
        <div style={{flex: "0", position: "sticky", bottom: 0, padding: "8px", backgroundColor: Colors.DARK_GRAY5}}>
            <span>count: {directory.contents.length}</span>
            <span style={{padding: "0 8px"}}>|</span>
            {selected_count > 0 ?
                <>
                <span>selected: {selected_count}</span>
                <span style={{padding: "0 8px"}}>|</span>
                </>
                :
                null
            }
            <span>total size: {bytes_to_unit_string(running_total)}</span>
        </div>
    </div>
}

export default DirView;