
import axios from "axios"
import configEntorno from "../../config.json"



const petition_post = (key, value) => {

    let url;
    let data;
    switch (key) {
        case "Register":
            url = `${configEntorno.urlBase}/api/auth/register`;
            data = value.data
            break;
        case "Login":
            url = `${configEntorno.urlBase}/api/auth/login`;
            data = value.data
            break;
        case "forgotPassword":
            url = `${configEntorno.urlBase}/api/auth/forgotPassword`;
            data = value.data
            break;
        default:
            return "error";
    }
    var config = {
        headers: {
            "Content-Type": "application/json",
        },
    };



    return axios.post(url, data, config)
}



export default petition_post