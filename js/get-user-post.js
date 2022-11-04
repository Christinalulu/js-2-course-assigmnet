import { USER_POSTS, DELETE_USER_POST_ID } from "./setting/api";
console.log(USER_POSTS);
import { getToken } from "./utils/storage";
import moment from "moment";

const userPostContainer = document.querySelector("#user-post_container");
console.log(userPostContainer);
const message = document.querySelector(".message");
console.log(message);

const accessToken = getToken();
console.log(accessToken);
if(!accessToken){
    location.href = "/login.html"
}

async function getUserPost() {
   const response = await fetch(USER_POSTS, {
      method: "GET",
      headers: {
         "Authorization": `Bearer ${accessToken}`,
      },
   });

   console.log("My Response", response);


   // Call the HTML
   if (response.ok) {
      const post = await response.json();
      const allPost = post.length;
      userPostContainer.innerHTML = "";
      if (!allPost) {
        message.innerHTML = "Not Posted yet";
      } else {
         for (let i = 0; i < allPost; i++) {
            const createdWhen = moment(post[i].created).fromNow();
            const {media,id, title, body, created} = post[i];
            userPostContainer.innerHTML += `
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
                                class="text-orange-600 hover:animate-pulse hover:cursor-pointer inline-flex items-center md:mb-2 lg:mb-0"
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
                                class="text-orange-400 hover:cursor-pointer hover:bg-red-600 hover:text-white p-2 rounded-sm mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <button type="button" class="delete-btn" data-id="${post[i].id}">Delete</button>
                               
                            </span>
                            <span
                                class="text-orange-400 inline-flex items-center leading-none text-sm hover:text-white hover:cursor-pointer p-2 hover:bg-green-500 rounded-sm">
                                <a href="edit_post.html?post_id=${post[i].id}"><button type="button" class="edit-btn">Edit</button></a>
                            </span>
                        </div>
                    </div>
                </div>
            </li> 
            `;
         }
      }
   } else {
      const err = await response.json();
      console.log(err);
      console.log("My Post failed");
   }
}

getUserPost().then(() => {
    handleDeteBtnEvents()
   })
   
function handleDeteBtnEvents () {
    const BtnDelete = document.getElementsByClassName("delete-btn");
    const BtnDeleteLength = BtnDelete.length;
    for (let i = 0; i < BtnDeleteLength; i++) {
       console.log(i);
       BtnDelete[i].addEventListener("click", function () {
          console.log("cliked me");
          handleDeletePostById(this.dataset.id);
       });
    }
 }

function handleDeletePostById(id){
    console.log("postId",id);
    const deleteUserPostId = async () => {
   try{
    await fetch(`${DELETE_USER_POST_ID}/${id}`,{
        method:"DELETE",
        headers : {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if(response.status === 200){
        console.log("DELET POST SUCCESS");
        getUserPost().then(() => {
            handleDeteBtnEvents();
         })
         .catch((err) => {
            console.log(err);
         });
        
    }else{
        const err = await response.json();
        const errMessage = `Somthing is not working ${err}`
        throw Error(errMessage)
    }
    }catch(error){
        console.log(error);
    }
}
deleteUserPostId().then(e =>{
})
}
