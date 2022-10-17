import {URL_SIGNUP} from "./settings/api";
import { validateEmailFrom, validatePasswords  } from "./utils/validation";

const signUpFrom = document.querySelector("#signup_form");

const username = document.querySelector("#username");
const usernameError = document.querySelector("#username_error");

const fromEmail = document.querySelector("#email");
const fromEmailError = document.querySelector("#email_error");

const formPassword = document.querySelector("#password");
const formPasswordError = document.querySelector("#password_error");
const formConfirmPassword = document.querySelector("#confirm_password");
const formConfirmPasswordError = document.querySelector("#confirm_password-error");

const generalErrorMessage = document.querySelector("#general-error-message");



signUpFrom.addEventListener("submit", function(event){
     event.preventDefault();

      let isFromUsername = false;
      if(username.value.trim().length > 0) {
        usernameError.classList.add("hidden");
        isFromUsername = true;
     }else{
        usernameError.classList.remove("hidden");
     }

     let isEmail = false;
     if(fromEmail.value.trim().length > 0){
        fromEmailError.classList.add("hidden");
        isEmail = true;
     }else{
        fromEmailError.classList.remove("hidden");
     }

     let isValidEmail = false;
     if(fromEmail.value.trim().length && validateEmailFrom(fromEmail.value) === true){
        fromEmailError.classList.add("hidden");
        isValidEmail = true;
    }else if (fromEmail.value.trim().length && validateEmailFrom(fromEmail.value) !== true){
        fromEmailError.classList.remove("hidden");
    }

    let isFromPassword = false;
    if(formPassword.value.trim().length >= 8){
        formPasswordError.classList.add("hidden");
        isFromPassword = true;
    }else{
        formPasswordError.classList.remove("hidden");
    }

    let isConfirmPasswordMatch = false;
    isConfirmPasswordMatch = validatePasswords(formPassword.value, formConfirmPassword.value );
    if(isConfirmPasswordMatch){
        formConfirmPasswordError.classList.add("hidden")
    }else{
        formConfirmPasswordError.classList.remove("hidden");
    }
    
    
    let isFromValid = isFromUsername && isEmail && isValidEmail && isFromPassword && isConfirmPasswordMatch;
    if(isFromValid){
        const signUpData = {
            "name": username.value,
            "email": fromEmail.value,
            "password": formPassword.value
        }
        const REG_USER_END = URL_SIGNUP;
        (async function signUpUser() {
            try{
                const response = await fetch(REG_USER_END, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signUpData)
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("POST REQUEST SUCCEEDED!!  🥳 🤗🤗");
                } else {
                    generalErrorMessage.innerHTML = `Sorry !! ${data.message}`
                }

            }catch(e){
                console.log(e);
            }
        })();
    }
    else{
        console.log("VALIDATION FAILED");
    }
}); 
              




