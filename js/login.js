import{validateEmail } from "./utils/validation"
import{LOGIN_USER_END} from "./settings/api";
import{saveUser, saveToken} from "./utils/storage";

const logInFrom = document.querySelector("#login-form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email_error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password_error");
const generalMessageErr = document.querySelector("#general-error-message")

if(logInFrom){
    logInFrom.addEventListener("submit", function(event){
        event.preventDefault();

        let isEmail = false;
        if(email.value.trim().length > 0){
            emailError.classList.add("hidden");
            isEmail =true;

        }else{
            emailError.classList.remove("hidden");
        }
        let isPassword = false;

        if (password.value.trim().length >= 8) {
            passwordError.classList.add("hidden");
            isPassword = true;
        } else {
            passwordError.classList.remove("hidden");
        }
        let isValidateEmail = false;
        if(email.value.trim().length && validateEmail(email.value)=== true) {
            emailError.classList.add("hidden")
         isValidateEmail = true
        }else if(email.value.trim().length){
            emailError.classList.remove("hidden")
        }

        let isLoginFromValid = isEmail && isPassword && isValidateEmail;

        if(isLoginFromValid){
            const userData = {
                "email": email.value,
                "password": password.value
            }
            const LOGIN = LOGIN_USER_END;
            (async function logInUser(){
                const response = await fetch(LOGIN,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                if(response.ok){
                    const data = await response.json();
                    saveToken(data.accessToken);
                    const userToSave = {
                        name: data.name,
                        email: data.email
                    }
                    saveUser(userToSave);
                    location.href = "/index.html"

                }else{
                    console.log("POST REQUEST LOGIN FAILED")
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    throw new Error(message);

                }

            })()
            .catch(err =>{
                console.log(err);
                generalMessageErr.innerHtml = `Sorry ${err.message}`
            });
        }else {
            console.log("Validation Failed!")
        }
    })
}
