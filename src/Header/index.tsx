import { Navbar, NavbarGroup, Button, NavbarDivider, Breadcrumbs, MenuItem, Menu, Overlay, Colors, Alignment } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fs_item_actions } from "../state/fs_item";
import { useStateDispatch, useStateSelector } from "../state/store";
import { FsItemType } from "../types";

function useFileList(cb: (file: File[]) => void) {
    let ref = useRef<File[]>([]);
    
    return {
        ref: ref.current,
        add_files: (list: FileList) => {
            for (let i = 0; i < list.length; i += 1) {
                ref.current.push(list[i]);
            }

            cb(ref.current);
        },
        drop: (index: number) => {
            if (index >= 0 && index < ref.current.length) {
                ref.current.splice(index, 1);

                cb(ref.current);
                return true;
            } else {
                return false;
            }
        },
        clear: () => {
            ref.current = [];

            cb(ref.current);
        }
    }
}

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useStateDispatch();
    const {
        loading: fs_item_loading,
        fs_item
    } = useStateSelector(state => state.fs_item);

    let file_ref = useRef<HTMLInputElement>(null);
    let [selected_files, setSelectedFiles] = useState<string[]>([]);
    let file_list = useFileList(files => {
        let list = [];

        for (let file of files) {
            list.push(file.name);
        }

        setSelectedFiles(list);
    });
    let [sending_sync, setSendingSync] = useState(false);
    let [sending_files, setSendingFiles] = useState(false);

    const sendSync = async (path: string) => {
        if (sending_sync) {
            return;
        }

        setSendingSync(true);

        let url = "/sync" + path;

        try {
            const response = await fetch(url, {
                method: "PUT"
            });

            let json = await response.json();

            if (response.status === 200) {
                console.log("directory synced");
            } else {
                console.log(json)
            }
        } catch(err) {
            console.log(err)
        }

        setSendingSync(false);
    }

    const sendFiles = async () => {
        if (sending_files) {
            return;
        }

        setSendingFiles(true);

        for (let i = 0; i < file_list.ref.length; i += 1) {
            let index = i + 0;
            let file = file_list.ref[index];
            let url = location.pathname;

            if (location.pathname[location.pathname.length - 1] !== "/") {
                url += "/";
            }

            url += file.name + "?override=1";

            fetch(url, {
                method: "POST",
                body: file
            }).then(async (res) => {
                try {
                    let json = await res.json();

                    if (res.status === 200) {
                        
                    } else {
                        console.log(json);
                    }
                } catch(err) {
                    console.log(err);
                }
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setSendingFiles(false);
            });
        }
    }

    useEffect(() => {
        file_list.clear();
    }, [location.pathname])

    let stripped_root = location.pathname.substring(3);
    let breadcrumbs = [
        {
            text: "Root",
            current: false,
            onClick: () => navigate("/fs/"),
        }
    ];

    let prefix_strip = location.pathname.substring(4);

    if (prefix_strip.length > 0) {
        let working = "";

        for (let item of prefix_strip.split("/")) {
            working += "/" + item;
            let nav = "/fs" + working;

            breadcrumbs.push({
                text: item,
                current: false,
                onClick: () => navigate(nav)
            });
        }
    }

    breadcrumbs[breadcrumbs.length - 1].current = true;

    return <>
        <Navbar>
            <NavbarGroup>
                <Popover2
                    interactionKind="click"
                    position="bottom-right"
                    usePortal={false}
                    content={<Menu>
                        <MenuItem icon="document" text="Add File" disabled={sending_files} onClick={() => {
                            file_ref.current.click();
                        }}/>
                        <MenuItem icon="folder-new" text="Add Folder"/>
                    </Menu>}
                >
                    <Button
                        type="button"
                        icon="add"
                        minimal
                        disabled={fs_item_loading || fs_item?.item_type !== FsItemType.Dir}
                    />
                </Popover2>
                <Button 
                    type="button" 
                    icon="trash"
                    title="Delete"
                    minimal
                    disabled={fs_item_loading}
                />
                <Button 
                    type="button"
                    icon="refresh"
                    title="Synchronize current view"
                    minimal 
                    disabled={sending_sync || fs_item_loading} 
                    onClick={() => {
                        sendSync(stripped_root)
                    }}
                />
                <NavbarDivider/>
                <Button
                    type="button" 
                    icon="repeat"
                    title="Refresh current view"
                    minimal
                    disabled={fs_item_loading} 
                    onClick={() => {
                        dispatch(fs_item_actions.getFsItem({location: stripped_root}))
                    }}
                />
                <Breadcrumbs items={breadcrumbs}/>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <Popover2
                    interactionKind="click"
                    position="bottom-right"
                    usePortal={false}
                    content={<Menu>
                        <MenuItem text="Event-Listeners"/>
                        <MenuItem icon="log-out" text="Logout"/>
                    </Menu>}
                >
                    <Button
                        type="button"
                        icon="menu"
                        minimal
                        disabled={fs_item_loading || fs_item?.item_type !== FsItemType.Dir}
                    />
                </Popover2>
            </NavbarGroup>
        </Navbar>
        <input ref={file_ref} type={"file"} multiple style={{display: "none"}} onChange={(ev) => {
            file_list.add_files(ev.target.files);
        }}/>
        {selected_files.length > 0 ?
            <div style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                backgroundColor: Colors.DARK_GRAY4,
                width: "300px",
                zIndex: 10
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                    padding: "4px"
                }}>
                    <div style={{flex: "1"}}>Files to Upload ({selected_files.length})</div>
                    <Button type="button" minimal icon="cloud-upload" text="Upload" disabled={sending_files} onClick={() => {
                        sendFiles();
                    }}/>
                </div>
                <div>
                    {selected_files.map((v, i) => {
                        return <div key={v} style={{
                            display: "flex",
                            flexFlow: "row nowrap",
                            alignItems: "center",
                            width: "100%",
                            padding: "4px"
                        }}>
                            <span style={{flex: "1"}}>{v}</span>
                            <div>
                                <Button minimal icon="small-cross" disabled={sending_files} onClick={() => {
                                    file_list.drop(i);
                                }}/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            :
            null
        }
    </>
}

export default Header;