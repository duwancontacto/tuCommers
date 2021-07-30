
import axios from "axios"
import configEntorno from "../../config.json"



const petition_patch = (key, value, token) => {

    let userData = JSON.parse(localStorage.getItem("userAuth"))


    let url;
    let data;
    switch (key) {
        case "formUser":
            url = `${configEntorno.urlBase}/api/initialform`;
            data = value.data
            break;
        case "restartPassword":
            url = `${configEntorno.urlBase}/api/auth/restartPassword`;
            data = value.data
            break;
        case "updateUser":

            url = `${configEntorno.urlBase}/api/getDataUser`;
            data = value.data
            break;
        case "addUser":

            url = `${configEntorno.urlBase}/api/groups`;
            data = value.data
            break;

        default:
            return "error";
    }
    var config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token || userData.token,
        },
    };



    return axios.patch(url, data, config)
}



export default petition_patch