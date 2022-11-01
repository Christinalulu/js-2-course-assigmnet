
import { getToken } from "./utils/storage";
import { CREATE_POST_URL } from "./setting/api";

const createPostFrom = document.querySelector("#create_form");
const postTitle = document.querySelector("#postTitle");
const postTitleErr = document.querySelector("#post_title_error");
const postDescription = document.querySelector("#post_description");
const postDescriptionErr = document.querySelector("#post_description_error");
const checked = document.querySelector("#ok")

if (createPostFrom) {
   createPostFrom.addEventListener("submit", function (event) {
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
      console.log(isPostFromValid);

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
            const response = await fetch(CREATE_POST_URL, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
               },
               body: JSON.stringify(dataPost),
            });

            if(response.ok){
                const data = await response.json();
                console.log(data); 
                checked.classList.remove("hidden")               
            }else{
                const err = await response.json();
                    console.log(err);
                    checked.classList.add("hidden")
                    throw new Error("hidden",checked) 
            }
        
            createPostFrom.reset();
            checked.reset();
         })().catch(e => {
            console.log(e);
         })

      } else {
         console.log("ALL FAILED");
      }
   });
}
