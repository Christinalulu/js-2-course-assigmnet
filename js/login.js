

import { validateEmail } from "./utils/validation";
import { LOGIN_URL } from "./setting/api";
import { saveToken ,saveUser } from "./utils/storage";
import createHeader from "./components/header";

createHeader();
const loginContent = document.querySelector("#login-form")
const email = document.querySelector("#email")
const emailError = document.querySelector("#email_error")
const emailErrorValide = document.querySelector("#email-valid")
const password = document.querySelector("#password")
const passwordError = document.querySelector("#password_error")
const generalMessage = document.querySelector("#general-message-error")


if(loginContent){
    loginContent.addEventListener("submit", function(event){
        event.preventDefault();

        let isEmail = false;
        if (email.value.trim().length > 0) {
            emailError.classList.add("hidden");
            isEmail = true;
        } else {
            emailError.classList.remove("hidden");
        }

        let isValidEmail = false;
        if (email.value.trim().length && validateEmail(email.value) === true) {
            emailErrorValide.classList.add("hidden");
            isValidEmail = true;
        } else if (email.value.trim().length && validateEmail(email.value) !== true) {
            emailErrorValide.classList.remove("hidden");
        }
        let isPasswordInput = false;
        if (password.value.trim().length >= 8) {
            passwordError.classList.add("hidden");
            isPasswordInput = true;
        } else {
            passwordError.classList.remove("hidden");
        }

        let isLoginValide = isEmail && isValidEmail && isPasswordInput;

        if(isLoginValide){
            console.log("From Success");
            const userData = {
                "email": email.value,
                "password": password.value
            }
            // Calling out data
            console.log(userData);
           

            (async function loginUser(){
                const response = await fetch(LOGIN_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                console.log("response",response);
               
                if(response.ok){
                    const data = await response.json();
                    console.log("data",data);
                    console.log("SUCCESS DATA");
                    console.log(data.accessToken);
                    saveToken(data.accessToken)
                   


                    const saveUserData = {
                        name: data.name,
                        email: data.email
                    }
                    saveUser(saveUserData);
                    location.href = "./index.html";

                }else{
                    const err = await response.json();
                    console.log(err);
                    console.log(err.errors[0].message);
                    throw new Error(err.errors[0].message)
                }
              
            })().catch(e => {
                console.log(e); 
                generalMessage.innerHTML = `Sorry ${e}`
            })

        }else{
            console.log("Validation FAILED")
        }
    })
}


