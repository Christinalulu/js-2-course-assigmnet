
import { validateEmailFrom, validatePasswords  } from "./utils/validation";

const signUpFrom = document.querySelector("#signup_form");
const fromUsername = document.querySelector("#username");
const fromUsernameError = document.querySelector("#username_error")
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
      if(fromUsername.value.trim().length > 0) {
        fromUsernameError.classList.add("hidden");
        isFromUsername = true;
     }else{
        fromUsernameError.classList.remove("hidden");
     }

     let isEmail = false;
     if(fromEmail.value.trim().length > 0){
        fromEmailError.classList.add("hidden");
        isEmail = true;
     }else{
        fromEmailError.classList.remove("hidden");
     }

     let isFromEmail = false;
     if(fromEmail.value.trim().length && validateEmailFrom(fromEmail.value) === true){
        fromEmailError.classList.add("hidden");
        isFromEmail = true;
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

    let isFormValid = isFromUsername &&
    isEmail &&
    isFromEmail &&
    isFromPassword &&
    isConfirmPasswordMatch;

    if(isFormValid){
        console.log("Validation SUCCEEDED ");
        const userData ={
            "name": fromUsername.value,
            "email": fromEmail.value,
            "password": formPassword.value
        }

        const REG_USER_URL_END = USER_SIGNUP_URL;
        (async function signUpUser(){
            try{
                const response = await fetch(REG_USER_URL_END, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                const data = await response.json();
                if(response.ok){
                    console.log("POST REQUEST SIGNUP SUCCESS");
                    location.replace("/")
                
                }else{
                    generalErrorMessage.innerHTML = `Sorry !! ${data.message}`

                }

            }catch(e){
                console.log(e);

            }
        })();

    }else{
        console.log("Validate FAILED");
    }

})

              




