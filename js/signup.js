const { fromJSON } = require("postcss");


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


contactFrom.addEventListener("submit", function(e){
    console.log("Have Submitted ;) ");
    e.preventDefault();

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
  if(password.value.trim().length >= 3){
    passwordErr.classList.add("hidden")
    isPassword = true;
  } else{
    passwordErr.classList.remove("hidden");
  }
  
 
// Is Confirm password
  let isPasswordConfirm = false;
  if(confirmPassword.value.trim().length >= 3){
    confirmPasswordErr.classList.add("hidden")
    isPasswordConfirm = true;
  }else{
    confirmPasswordErr.classList.remove("hidden");
  }
  

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword();

//   console.log("Username",isUserName);
//   console.log("email",isEmail);
//   console.log("password",isPassword);
//   console.log("confirm password",isPasswordConfirm);
//   console.log("password matching",isValidPasswordMatch);

  let isValidFrom = isUserName 
  && isEmail 
  && isValidateEmail
  && isPassword 
  && isPasswordConfirm 
  && isValidPasswordMatch;

  if(isValidFrom){
    console.log("VALIDATION SUCCEED")
    console.log("",userName.value)
    console.log("",email.value)
    console.log("",password.value)

    const userData = {
        "name": userName.value,
        "email": email.value,
        "password": password.value
    }
    // console.log(userData)
    const REG_USER_URL = "https://nf-api.onrender.com/api/v1/social/auth/register";
    // console.log(REG_USER_URL)

    async function signUpUser(){
        try{
            const response = await fetch(REG_USER_URL, {
                method: "POST",
                header:{
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(userData)
            });
            console.log("response",response);
            const data = await response.json();
            console.log(data)
            console.log("POST REQUEST SUCCEED")

        }catch (e){
            console.log(e);
            console.log("POST REQUEST FAILED")

        }

    }
    signUpUser();





  }else{
    console.log("VALIDATION FAILED")
  }



});



function validateEmail(email) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(){
    const passwordValue = password.value
    const passwordMatch = confirmPassword.value;

    if(!passwordValue){
        return false;
    }if(!passwordMatch){
        return false;
    }
    if(passwordValue !== passwordMatch){
        confirmPasswordMatch.classList.remove("hidden");
        return false;
    }else{
        confirmPasswordMatch.classList.add("hidden");
        return true;
    }
}

 






