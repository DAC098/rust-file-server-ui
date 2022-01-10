export function request(method: string, url: string, json?: any) {
    let full_url = new URL(url, "http://truth.dac098.com:11080");
    let headers = {
        "accept": "application/json"
    };
    let body = null;

    if (json != null) {
        headers["content-type"] = "application/json";
        body  = JSON.stringify(json);
    }

    fetch(full_url.toString(), {
        method,
        headers,
        body,
        mode: "no-cors"
    }).then(res => {
        console.log("code:", res.status, " ", res.statusText);
        return res.json();
    }).then(json => {
        console.log(json)
    }).catch(err => {
        console.error(err);
    });
}

window["request"] = request;