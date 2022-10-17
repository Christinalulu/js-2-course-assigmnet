import '../style.css'
import {CREATE_POST_URL} from "./settings/api";
import {getToken} from "./utils/local_storage";

// All post


// create new post
const createPostFrom = document.querySelector("#create_form")
const postTitle = document.querySelector("#post_title");
const postTitleError = document.querySelector("#post_title_error");
const postDescription = document.querySelector("#post_description");
const postDescriptionError = document.querySelector("#post_description_error");


if(createPostFrom){
    createPostFrom.addEventListener("submit", function (event){
        event.preventDefault();

        let isPostTitle = false;
        if(postTitle.value.trim().length > 0){
            postTitleError.classList.add("hidden");
            isPostTitle = true;
        }else{
            postTitleError.classList.remove("hidden");
        }

        let isPostDescription = false;
        if(postDescription.value.trim().length > 0){
            postDescriptionError.classList.add("hidden");
            isPostDescription = true;
        }else{
            postDescriptionError.classList.remove("hidden");
        }

        let isFromValid = isPostTitle && isPostDescription;
        if(isFromValid){
            console.log("Validation SUCCEEDED");
            const postData = {
                "title": postTitle.value,
                "body": postDescription.value
            } 
            const accessToken = getToken();
            (async function createPost() {
                const response = await fetch(CREATE_POST_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(postData)
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    console.log("CREATE POST SUCCEEDED!!  🥳 🤗🤗");
                    // location.href = "/thank-you.html"
                } else {
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    createPostFrom.reset();
                    console.log("CREATE POST Failed!!  💩");
                    throw new Error(message);
                }
            })().catch(err => {
                generalErrorMessage.innerHTML = `Sorry !! ${err.message}`
            });
        }else{
            console.log("Validation FAILED!! 💩");
        }
    });
}





