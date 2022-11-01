import { getUserName } from "../utils/storage";

function createHeader() {
   const navBar = document.querySelector("#nav-bar");
   console.log(navBar);

   const {pathname} = document.location
   const userName = getUserName();
  
let authLink = `<a href="/login.html">Login</a>`

if(userName){
authLink = `
<li class="">
<span>Hello👋 ${userName}</span>
</li>
<li class="">

      <a href="/index.html" class="${pathname === "/index.html" ? " underline ": ""}">Home</a>

   </li>
   <li>

      <a href="/profile.html" class="${pathname === "/profile.html" ? " underline": ""}">Profile</a>

   </li>
`
}

   navBar.innerHTML = `
   <ul class="flex gap-x-4 uppercase">
   ${authLink}
   </ul>
   `

 
  

}

export default createHeader;
