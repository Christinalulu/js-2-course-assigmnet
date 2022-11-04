import { getToken } from "./utils/storage";
import { GET_POST_BY_ID } from "./setting/api";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString)
const postId = searchParam.get("post_id")
const accessToken = getToken();
console.log(accessToken);
if(!accessToken){
   location.href = "/login.html"
}
const singelPost = document.getElementById("post-details");
async function getPostByID(){
const response = await fetch(`${GET_POST_BY_ID}/${postId}`,{
   method: "GET",
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
   }
})
console.log(response)
const data = await response.json();
console.log(data);
const {id, body, title, updated, created ,media} = data;
singelPost.innerHTML = 
`
<div class=" m-24  h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
<img
                    class=" w-full object-cover object-center"
                    src=" ${media}"
                    alt="blog" />
                    
                  <div class=" m-auto p-6>
                  <h2
                  class="text-xs title-font font-medium text-gray-400 mb-1">
                  ${id}
              </h2>
              <h3
                        class="text-xs title-font font-medium text-gray-400 flex justify-end">
                       ${created}
                    </h3>
                    <h1 class="text-lg font-medium text-gray-900 mb-3">
                        ${title}
                    </h1>
                    <p class="mb-3">
                       ${body}
                    </p>
                   
                  </div>

</div>






`



}
getPostByID();