import{REG_USER_END} from "./settings/api";
import{validateEmail,validatePassword } from "./utils/validation"


const contactFrom = document.querySelector("#signup_form");
// Username
const userName = document.querySelector("#user-name");
const userNameErr = document.querySelector("#user-name-error");
// Email
const email = document.querySelector("#email");
const emailErr = document.querySelector("#email_err");
// Password
const password = document.querySelector("#password");
const passwordErr = document.querySelector("#password_err");
// Password confirm
const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordErr  = document.querySelector("#confirm_password-err");
const confirmPasswordMatch  = document.querySelector("#confirm_password-match");
// General Message
const generalMessageErr = document.querySelector("#general-error-message")


contactFrom.addEventListener("submit", function(event){
  event.preventDefault();
  // userName
    let isUserName = false;
    if(userName.value.trim().length > 0) {
        userNameErr.classList.add("hidden");
        isUserName = true;
   }else{
    userNameErr.classList.remove("hidden");
   }
   // Email
   let isEmail = false;
   if(email.value.trim().length > 0){
    emailErr.classList.add("hidden");
    isEmail = true;
   }else{
    emailErr.classList.remove("hidden");
   }
      let isValidateEmail = false;
   if(email.value.trim().length && validateEmail(email.value)=== true) {
    emailErr.classList.add("hidden")
    isValidateEmail = true
   }else if(email.value.trim().length){
    emailErr.classList.remove("hidden")
   }
     // PASSWORD  
  let isPassword = false;
  if(password.value.trim().length >= 8){
    passwordErr.classList.add("hidden")
    isPassword = true;
  } else{
    passwordErr.classList.remove("hidden");
  }
  // Is Confirm password
  let isPasswordConfirm = false;
  if(confirmPassword.value.trim().length >= 8){
    confirmPasswordErr.classList.add("hidden")
    isPasswordConfirm = true;
  }else{
    confirmPasswordErr.classList.remove("hidden");
  }
  // Password matching
    let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword(password.value, confirmPassword.value); // true // false
    if (isValidPasswordMatch) {
        confirmPasswordMatch.classList.add("hidden");
        isValidPasswordMatch = true
    } else {
        confirmPasswordMatch.classList.remove("hidden");
    }

    // console.log("userName",isUserName);
    // console.log("email",isEmail);
    // console.log("valid Email",isValidateEmail);
    // console.log("password",isPassword);
    // console.log("Confirm password",isPasswordConfirm);
    // console.log("Valid Matching password",isValidPasswordMatch);

      let isValidFrom = isUserName 
  && isEmail 
  && isValidateEmail
  && isPassword 
  && isPasswordConfirm 
  && isValidPasswordMatch;

  
   if(isValidFrom){
    console.log("Validation Succeed");
    const userData = {
        "name": userName.value,
        "email": email.value,
        "password": password.value
    }
   
    // console.log(USER_REG_URL_API_END);
    //  const USER_REG_URL_API_END = REG_USER_END;
     const USER_REG_URL_API_END = "https://nf-api.onrender.com/api/v1/social/auth/register";
     // API Call

     (async function SignUpUser(){
      try{
        const response = await fetch(USER_REG_URL_API_END, {
              method: 'POST',
               header:{
                "Content-Type": "application/json"
          },
          body : JSON.stringify(userData)
        });
        console.log("API",response);

        const data = await response.json();
      console.log(data);

        if(response.ok){
          location.replace("/index.html")
        }else{
          generalMessageErr.innerHTML = `Sorry ${response.status}`
        }
        
      }catch(err){
        console.log(err);
        console.log("Failed API Call");

      }

     })();

   }else{
    console.log("Failed Validation")
   }

});



 






