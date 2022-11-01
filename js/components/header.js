import { getUserName } from "../utils/storage";
function createHeader() {
   const navBar = document.querySelector("#nav-bar");
   const {pathname} = document.location
   if(navBar){
      const userName = getUserName();
  
      let authLink = `<a href="/login.html">Login</a>`
      
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
