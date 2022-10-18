import {URL_LOGIN} from "./settings/api";
import { validateEmailFrom } from "./utils/validation";
import {saveToken, saveUser} from "./utils/local_storage";

const logInFrom = document.querySelector("#loginFrom");
const loginEmail = document.querySelector("#email");
const loginEmailError = document.querySelector("#email_error");
const loginPassword = document.querySelector("#password");
const loginPasswordError = document.querySelector("#password_error");
const generalErrorMessage = document.querySelector("#general-message-error");


if(logInFrom) {
    logInFrom.addEventListener("submit", function (event){
        event.preventDefault();

       let isLogInEmail = false;
       if(loginEmail.value.trim().length > 0){
        loginEmailError.classList.add("hidden");
        isLogInEmail = true;
       }else{
        loginEmailError.classList.remove("hidden");
       }

       let isValidEmail = false;
     if(loginEmail.value.trim().length && validateEmailFrom(loginEmail.value) === true){
        loginEmailError.classList.add("hidden");
        isValidEmail = true;
    }else if (loginEmail.value.trim().length && validateEmailFrom(loginEmail.value) !== true){
        loginEmailError.classList.remove("hidden");
    }
    let isFromPassword = false;
    if(loginPassword.value.trim().length >= 8){
        loginPasswordError.classList.add("hidden");
        isFromPassword = true;
    }else{
        loginPasswordError.classList.remove("hidden");
    }

    let isLoginFromValid = isLogInEmail && isValidEmail && isFromPassword;

    if (isLoginFromValid){
        console.log("Validation SUCCEEDED!!")
        const userData = {
            "email": loginEmail.value,
            "password": loginPassword.value
        }
       (async function logInUser(){
        const response = await fetch(URL_LOGIN,{
            method:"POST",
            headers :{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        console.log(response);
        console.log("data" ,data);

        if(response.ok){
            const data = await response.json();
            saveToken(data.accessToken);
            const userToSave ={
                name: data.name,
                email: data.email
            }
            saveUser(userToSave);
            location.href ="index.html";

        }else{
            const err = await response.json();
            throw new Error(err.message);
        }
       
       })().catch(err =>{
        console.log(err)
        generalErrorMessage.innerHTML `Sorry ${err.message}`

       })
      

      

        
    }else {
        console.log("Validation FAILED");
    }
    });
}




    
              




