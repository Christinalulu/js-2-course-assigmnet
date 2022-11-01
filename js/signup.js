import { validateEmail,validatePassword } from "./utils/validation";
import {REGISTER_URL } from "./setting/api";

const registerForm = document.querySelector("#register");

const userName = document.querySelector("#username");
const userNameErr = document.querySelector("#username-err");

const emailInput = document.querySelector("#email");
const emailErr = document.querySelector("#email_err");

const password = document.querySelector("#password");
const passwordErr = document.querySelector("#password_err");

const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordErr = document.querySelector("#confirm_password-err");
const confirmPasswordMatch = document.querySelector("#confirm_password-match");

const generalMessage = document.querySelector("#general-error-message");



registerForm.addEventListener("submit", function (event) {
   event.preventDefault();

   let isUserName = false;
    if (userName.value.trim().length > 0) {
        userNameErr.classList.add("hidden");
        isUserName = true;
    } else {
        userNameErr.classList.remove("hidden");
    }
    

    let isEmail = false;
    if (emailInput.value.trim().length > 0) {
        emailErr.classList.add("hidden");
        isEmail = true;
    } else {
        emailErr.classList.remove("hidden");
    }
    
    
    let isValidEmail = false;
    if (emailInput.value.trim().length && validateEmail(emailInput.value) === true) {
        emailErr.classList.add("hidden");
        isValidEmail = true;
    } else if (emailInput.value.trim().length && validateEmail(emailInput.value) !== true) {
        emailErr.classList.remove("hidden");
    }
   

    let isPasswordInput = false;
    if (password.value.trim().length >= 8) {
        passwordErr.classList.add("hidden");
        isPasswordInput = true;
    } else {
        passwordErr.classList.remove("hidden");
    }
    let isConfirmPassword = false;
    if(confirmPassword.value.trim().length >= 8){
        confirmPasswordErr.classList.add("hidden");
        isConfirmPassword = true;

    }else{
        confirmPasswordErr.classList.remove("hidden");

    }

    let isPasswordMatching = false;
    isPasswordMatching = validatePassword(password.value, confirmPassword.value); // true // false
    if (isPasswordMatching) {
        confirmPasswordMatch.classList.add("hidden");
        isPasswordMatching = true
    } else {
        confirmPasswordMatch.classList.remove("hidden");
    }

    let isValidationTrue = isUserName 
    && isEmail
    && isValidEmail
    && isPasswordInput 
    && isConfirmPassword 
    && isPasswordMatching;

    if(isValidationTrue){
        console.log("VALIDATION SUCCEEDED");
        const userData = {
            "name": userName.value ,                          
            "email": emailInput.value,           
            "password": password.value               
          }

          (async function signUpUser(){
            try{
                const response = await fetch(REGISTER_URL,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })

                const data = await response.json();
              
                if(response.ok){
                    location.href = "./welcome.html";
                }else{
                    generalMessage.innerHTML = `SORRY ${data.errors[0].message}`
                }

            }catch(e){
                console.log(e);
            }
          })();

    }else{
        console.log("Validation FAILED");
    }
});

