
import axios from "axios"
import configEntorno from "../../config.json"

const petition_delete = (key, data) => {
    let userData = JSON.parse(localStorage.getItem("userAuth"))
    let url;
    switch (key) {
        case "deleteUserOfGroup":
            url = `${configEntorno.urlBase}/api/groups/${data.userId}`;
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



    return axios.delete(url, config)
}



export default petition_delete