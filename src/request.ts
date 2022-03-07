import JSONLocal from "./json";

export function request(method: string, url: string, json?: any) {
    let full_url = new URL(url, window.location.origin);
    let headers = {"accept": "application/json"};
    let body = null;

    if (json != null) {
        headers["content-type"] = "application/json";
        body  = JSONLocal.stringify(json);
    }

    fetch(full_url.toString(), {
        method,
        headers,
        body
    }).then(res => {
        console.log("code:", res.status, " ", res.statusText);
        return res.text();
    }).then(json => {
        console.log(JSONLocal.parse(json))
    }).catch(err => {
        console.error(err);
    });
}

window["request"] = request;