import {URL_LOGIN} from "./settings/api";
import { validateEmailFrom } from "./utils/validation";
import {saveUser, saveToken} from "./utils/local_storage";

const logInFrom = document.querySelector("#loginFrom");

const loginEmail = document.querySelector("#email");
const loginEmailError = document.querySelector("#email_error");

const loginPassword = document.querySelector("#password");
const loginPasswordError = document.querySelector("#password_error");

const generalErrorMessage = document.querySelector("#general-error-message");

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
        console.log("userData", userData);
        // APi call
        console.log(URL_LOGIN)

        (async function loginUser(){
            const response = await fetch(URL_LOGIN,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                const data = await response.json();

                console.log(data);
                console.log(data.accessToken)
                // save Token
                saveToken(data.accessToken);
                //

                // // save user
                const userToSave = {
                    name: data.name,
                    email: data.email
                }
                console.log(userToSave);
                saveUser(userToSave);
                console.log("POST REQUEST LOGIN SUCCEEDED!!  🥳 🤗🤗");
                location.href = "/index.html"
            } else {
                const err = await response.json();
                const message = `An error occurred: ${err.message}`;
                console.log("POST REQUEST LOGIN Failed!!  💩");
                throw new Error(message);
            }

        })().catch(err =>{
            generalErrorMessage.innerHTML = `Sorry !! ${err.message}`
        });
    }else {
        console.log("Validation FAILED");
    }
    });
}




    
              




