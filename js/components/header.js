import { getUserName } from "../utils/storage";
function createHeader() {
   const navBar = document.querySelector("#nav-bar");
   const {pathname} = document.location
   if(navBar){
      const userName = getUserName();
      let authLink = `
      <li class="p-4"><a href="/login.html">Login</a></li>
      <li class="p-4"><a href="/signup.html">Signup</a></li>`
      if(userName){
      authLink = `
      <li class="p-4">
      <span>Hello👋 ${userName}</span>
      </li>
      <li class="p-4">
      
            <a href="/index.html" class="${pathname === "/index.html" ? " underline ": ""}">Home</a>
      
         </li>
         <li class=" p-4">
      
            <a href="/profile.html" class="${pathname === "/profile.html" ? " underline": ""}">Profile</a>
      
         </li>
         <li class="p-4  "><button id="log_out-btn" class=" uppercase  rounded-xl " >Log out</button> </li>
      `
      }
         navBar.innerHTML = `
         <ul class=" flex space-x-4  uppercase p-2">
         ${authLink}
         </ul>
         `
      }

   }
export default createHeader;
