import React, { useState } from "react"
import { Button, Colors, InputGroup } from "@blueprintjs/core"
import { useNavigate } from "react-router-dom";
import JSONLocal from "./json";

const Login = ({}) => {
    let navigate = useNavigate();
    let [username_value, setUsernameValue] = useState("");
    let [password_value, setPasswordValue] = useState("");
    let [sending_login, setSendingLogin] = useState(false);

    const sendLogin = async () => {
        if (sending_login) {
            return;
        }

        console.log("sending login");

        setSendingLogin(true);

        try {
            const response = await fetch("/auth/session", {
                method: "POST",
                body: JSONLocal.stringify({
                    username: username_value,
                    password: password_value
                })
            });

            let json = JSONLocal.parse(await response.text());

            if (response.status === 200) {
                navigate("/fs/");
            } else {
                setSendingLogin(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <div style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        backgroundColor: Colors.GRAY1,
        padding: "8px",
    }}>
        <form onSubmit={(ev) => {
            ev.preventDefault();

            sendLogin();
        }}>
            <div style={{
                display: "flex", 
                flexFlow: "column nowrap",
                gap: "8px"
            }}>
                <InputGroup placeholder="Username" type="text" value={username_value} onChange={(ev) => {
                    setUsernameValue(ev.target.value)
                }}/>
                <InputGroup placeholder="Password" type="password" value={password_value} onChange={(ev) => {
                    setPasswordValue(ev.target.value)
                }}/>
                <div>
                    <Button text="Login" type="submit" disabled={username_value.length === 0 || password_value.length === 0}/>
                </div>
            </div>
        </form>
    </div>
}

export default Login;