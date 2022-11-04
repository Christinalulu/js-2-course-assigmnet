import { getToken } from "./utils/storage";
import { GET_ALL_POST } from "./setting/api";
import moment from "moment";

const allPOstContainer = document.querySelector("#all-post_container");
console.log(allPOstContainer);
const accessToken = getToken();
if(!accessToken){
    location.href = "/login.html"
}


(async function getAllPosts(){
   const response = await fetch(GET_ALL_POST,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response",response);
   
    if(response.ok){
        const post = await response.json();
        console.log("All posts",post);
        console.log(post.map);
       const listPostItems = post.map((post)=>{
        const {id, title, body, created, media} = post
        const createdWhen = moment(created).fromNow();
        return(`
        <li class="p-4 md:w-1/3">
            <div
                class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                    class="lg:h-48 md:h-36 w-full object-cover object-center"
                    src=" ${media}"
                    alt="blog" />
                <div class="p-6">
                    <h2
                        class="text-xs title-font font-medium text-gray-400 mb-1">
                        ${id}
                    </h2>
                    <h3
                        class="text-xs title-font font-medium text-gray-400 flex justify-end">
                       ${createdWhen}
                    </h3>
                    <h1 class="text-lg font-medium text-gray-900 mb-3">
                        ${title}
                    </h1>
                    <p class="mb-3">
                       ${body}
                    </p>
                    <div class="flex items-center flex-wrap">
                        <a href="/details-post.html?post_id=${id}"
                            class="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-red-800 hover:animate-pulse"
                            >Go to site
                            <svg
                                class="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <span
                            class="text-orange-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg
                                class="w-4 h-4 mr-1"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24">
                                <path
                                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"></circle></svg
                            >1.2K
                        </span>
                        <span
                            class="text-orange-400 inline-flex items-center leading-none text-sm">
                            <svg
                                class="w-4 h-4 mr-1"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path></svg
                            >6
                        </span>
                    </div>
                </div>
            </div>
        </li> 
        `
        )
       }).join("")
       allPOstContainer.insertAdjacentHTML("beforeend",listPostItems )
    }else{
        const err = await response.json()
        console.log("somer Error happened",err);
        throw new Error(err)
    }
})().catch(e => {
    console.log(e);
    console.log("ALL POST FAILED");
})

