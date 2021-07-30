
import axios from "axios"
import configEntorno from "../../config.json"

const petition_get = (key) => {
    let userData = JSON.parse(localStorage.getItem("userAuth"))
    let url;
    switch (key) {
        case "Login":
            url = `${configEntorno.urlBase}/api/login`;
            break;
        case "getDataUser":
            url = `${configEntorno.urlBase}/api/getDataUser`;
            break;
        case "resetToken":
            url = `${configEntorno.urlBase}/api/auth/resetToken`;
            break;
        case "getListOfGrups":
            url = `${configEntorno.urlBase}/api/groups`;
            break;
        case "getListTemplate":
            url = `${configEntorno.urlBase}/api/templates`;
            break;
        default:
            return "error";
    }
    var config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": userData ? userData.token : "",
        },
    };



    return axios.get(url, config)
}



export default petition_get