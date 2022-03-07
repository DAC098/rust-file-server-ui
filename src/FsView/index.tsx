import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { fs_item_actions } from "../state/fs_item"
import { useStateDispatch, useStateSelector } from "../state/store"
import DetailsView from "./DetailsView"
import DirView from "./DirView"
import FileView from "./FileView"
import Header from "../Header"
import LoadingOverlay from "../LoadingOverlay"

const FsView = (props: {}) => {
    const location = useLocation();

    const {loading, error, fs_item} = useStateSelector(state => state.fs_item);
    const dispatch = useStateDispatch();

    console.log(fs_item);

    useEffect(() => {
        dispatch(fs_item_actions.getFsItem({location: location.pathname.substring(3)}))
    }, [location.pathname]);

    let to_render = null;

    if (fs_item != null) {
        switch (fs_item.item_type) {
            case 1:
                to_render = <FileView file={fs_item} location={location.pathname}/>;
                break;
            case 2:
                to_render = <DirView directory={fs_item} location={location.pathname}/>;
                break;
            default:
                to_render = <div>Unknown fs item</div>;
                break;
        }
    } else if (!loading) {
        to_render = <div>Nothing to view</div>
    }

    return <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "min-content auto",
        gridTemplateColumns: "auto 300px"
    }}>
        <div style={{position: "relative", gridColumn: "1 / 3", gridRow: "1 / 2"}}>
            <Header/>
        </div>
        <div style={{position: "relative", overflow: "auto", gridColumn: "1 / 2", gridRow: "2 / 3"}}>
            {loading ?
                <LoadingOverlay/>
                :
                null
            }
            {to_render}
        </div>
        <div style={{position: "relative", overflow: "auto", gridColumn: "2 / 3", gridRow: "2 / 3"}}>
            {fs_item != null ?
                <DetailsView fs_item={fs_item}/>
                :
                null
            }
        </div>
    </div>
}

export default FsView;