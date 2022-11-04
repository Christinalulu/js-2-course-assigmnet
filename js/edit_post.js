import { getToken } from "./utils/storage";
import { EDIT_POST_ID } from "./setting/api";

const accessToken = getToken();



const editPostFrom = document.querySelector("#edit_form");
const postTitle = document.querySelector("#postTitle");
const postTitleErr = document.querySelector("#post_title_error");
const postDescription = document.querySelector("#post_description");
const postDescriptionErr = document.querySelector("#post_description_error");
const checked = document.querySelector("#ok")
const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString)
const postId = searchParam.get("post_id")


async function editPostById(){
   const response = await fetch(`${EDIT_POST_ID}/${postId}`,{
      method: "GET",
      headers: {
         "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
   })
   console.log("repsonse",response);
   if(response.status === 200){
      const data = await response.json();
      const {id, body, title, created ,media} = data;
      postTitle.value = title;
      postDescription.value = body;

   }else{
      const err = await response.json();
      throw err.message
   }
}
editPostById().catch(err => {
   console.log(err);
});
editPostFrom.addEventListener("submit", function (event) {
   event.preventDefault();

   let isPostTitle = false;
   if (postTitle.value.trim().length > 0) {
      postTitleErr.classList.add("hidden");
      isPostTitle = true;
   } else {
      postTitleErr.classList.remove("hidden");
   }
   console.log(isPostTitle);
   let isPostDescription = false;
   if (postDescription.value.trim().length > 0) {
      postDescriptionErr.classList.add("hidden");
      isPostDescription = true;
   } else {
      postDescriptionErr.classList.remove("hidden");
   }
   console.log(isPostDescription);

   let isPostFromValid = isPostTitle && isPostDescription;
   console.log("From is valid",isPostFromValid);

   if (isPostFromValid) {
      const dataPost = {
         title: postTitle.value,
         body: postDescription.value,
      };
      console.log(dataPost);

      const accessToken = getToken();

      console.log(accessToken);
      console.log("API CALL",CREATE_POST_URL);

      (async function createPost() {
         const response = await fetch(`${EDIT_POST_ID}/${postId}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(dataPost),
         });

         if(response.ok){
             const data = await response.json();
             console.log(data); 
             console.log("post created");
            
               location.href = `profile.html?post_id=${postId}`
         }else{
           
             const err = await response.json();
                 console.log(err);
                 throw new Error("hidden",checked) 
         }
      })().catch(e => {
         console.log(e);
      })

   } else {
      console.log("ALL FAILED");
   }
});