// Create POST 

const createPostFrom = document.querySelector("#create_form");
const postTitle = document.querySelector("#postTitle");
const postTitleErr = document.querySelector("#post_title_error");
const postDescription = document.querySelector("#post_description");
const postDescriptionErr = document.querySelector("#post_description_error");
if(createPostFrom){
    createPostFrom.addEventListener("submit", function(event){
        event.preventDefault();

        let isPostTitle = false;
        if(postTitle.value.trim().length > 0){
            postTitleErr.classList.add("hidden");
            isPostTitle = true;
        }else{
            postTitleErr.classList.remove("hidden");
        }

        let isPostDescription = false;
        if(postDescription.value.trim().length > 0){
            postDescriptionErr.classList.add("hidden");
            isPostDescription = true;

        }else{
            postDescriptionErr.classList.remove("hidden");

        }
        let isFormValid = isPostTitle && isPostDescription;
        console.log(isFormValid)
        console.log(postTitle.value)
        console.log(postDescription.value)

        if(isFormValid){
            const postData = {
                "title": postTitle.value,
                "body": postDescription.value
            }
            console.log(postData);
            
            const accessToken = getToken();
            (async function createPost(){
                const response = await fetch(CREATE_POST_END,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(postData)
                });
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                }else{
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    createPostFrom.reset();
                    throw new Error(message);
                }

            })().catch(err =>{
                console.log(err)
            })
        }else{
            console.log("Validation FAILED")
        }
    })

};
