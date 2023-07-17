import axios from "axios";

export default function post(route: String, data?: Object) {
    axios.post("https://helse-sprik.intern.dev.nav.no" + route, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })
}