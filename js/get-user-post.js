import { GET_USER_POST_URL } from "./setting/api";
import { getToken } from "./utils/storage";
// import { getUserEmail } from "./utils/storage"
// import moment from "moment";

const userPostContainer = document.querySelector("#user-post_container");
console.log(userPostContainer);
console.log(GET_USER_POST_URL);
const accessToken = getToken()
console.log(accessToken);

(async function getUserPost (){
const response = await fetch(GET_USER_POST_URL,{
    method: "GET",
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }
})
console.log("My Response",response);
})();
