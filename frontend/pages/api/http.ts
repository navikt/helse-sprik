import axios from "axios";

export default function post(route: String, data?: Object) {
    axios.post("http://0.0.0.0:8080/" + route, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })
}