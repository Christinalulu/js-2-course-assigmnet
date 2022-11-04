import '../style.css'
import {clearStorage } from "./utils/storage"
import createHeader from "./components/header";


createHeader();
const logOutBtn = document.querySelector("#log_out-btn");

if(logOutBtn){
    logOutBtn.addEventListener("click", function(){
        console.log(" i am clicked");
        clearStorage();
        window.location.replace("/login.html")
    })
}
