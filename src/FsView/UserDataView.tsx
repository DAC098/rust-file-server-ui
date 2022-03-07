import React from "react"

interface UserDataView {
    object_key: string
    user_data: any
}

const UserDataView = ({object_key= "root", user_data}) => {
    if (Array.isArray(user_data)) {
        return <ul style={{
            margin: 0,
            paddingLeft: "16px",
            listStyleType: "none",
        }}>
            {user_data.map((v, index) => {
                let key = object_key + index.toString();

                return <li key={key}>
                    <UserDataView object_key={key} user_data={v}/>
                </li>
            })}
        </ul>
    } else {
        let typeof_str = typeof user_data;

        switch (typeof_str) {
            case "string":
            case "number":
                return <span>{user_data}</span>
            case "boolean":
                return <span>{user_data ? "true" : "false"}</span>
            case "object":
                return <div>
                    {Object.entries(user_data).map(([k,v]) => {
                        let key = object_key + k;

                        return <div key={key} style={{paddingLeft: "16px"}}>
                            <span style={{paddingRight: "8px"}}>{k}</span>
                            <UserDataView object_key={key} user_data={v}/>
                        </div>
                    })}
                </div>
            default:
                return <span>{typeof_str}</span>
        }
    }
}

export default UserDataView;