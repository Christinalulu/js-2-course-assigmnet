import '../style.css'
import {CREATE_POST_URL} from "./settings/api";
import {GET_ALL_POST} from "./settings/api";
import {getToken} from "./utils/local_storage";
import moment from 'moment/moment';

// create new post
const createPostFrom = document.querySelector("#create_form")
const postTitle = document.querySelector("#post_title");
const postTitleError = document.querySelector("#post_title_error");
const postDescription = document.querySelector("#post_description");
const postDescriptionError = document.querySelector("#post_description_error");
const generalErrorMessage = document.querySelector("#general-message-error");
const postContainer = document.querySelector("#post_container")

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
                   location.href ="index.html"
                } else {
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    throw new Error(message);
                }
                createPostFrom.reset();
            })().catch(err => {
                generalErrorMessage.innerHTML = `Sorry !! ${err.message}`
            });
        }else{
            console.log("Validation FAILED!! 💩");
        }
    });
}

// All post
const accessToken = getToken();
 (async function getAllPost() {
    const response = await fetch("GET_ALL_POST", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    console.log(response);
    if(response.ok){
        const posts = await response.json();
        console.log(posts);
        console.log("GET POSTS SUCCEEDED!!  🥳 🤗🤗");
        let now = moment(new Date()); //today's date

        const listOfHtmlPosts = posts.map((post) => {
            console.log("post: ", post);
            const postBody = post.body;
            const postTitle = post.title;
            const createdDate = post.created;
            const daysSinceCreated = now.diff(createdDate, 'days');
            return (`
            <li class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="/asset/img/bg-post1.jpg" alt="blog">
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <time class="tracking-widest text-xs title-font font-medium text-gray-400  flex justify-end">${daysSinceCreated} </time>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${postTitle} </h1>
                <p class="leading-relaxed mb-3">${postBody} </p>
                <div class="flex items-center flex-wrap ">

                  <a class="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0">Go to site
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <span class="text-orange-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span class="text-orange-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </li>
            
            
`)
    }).join("");
    postContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
 }else{
    const err = await response.json();
    const message = `Sorry some error ${err}`;
    throw new Error(message)
 }
   
 })().catch(err =>{
    console.log("GET POSTS FAILED!!  😥😥😥");
    console.log(err);
 })


