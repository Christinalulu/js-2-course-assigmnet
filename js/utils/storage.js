const tokenKey = "token"
const userKey = "user"

function saveToken(token){
    saveToLocalStorage(tokenKey, token)
}

// Get Token
function getToken(){
    const value = localStorage.getItem(tokenKey);
    if(value){
        return JSON.parse(value);
    }else{
        return
    }
   
}

function saveUser(user){
    saveToLocalStorage(userKey, user)
}
function getUserName(){
    const user = getFromLocalStorage(userKey)
    if(userKey){
        return user.name
    }else{
        return null;
    }
}

function getUserEmail(){
    const user = getFromLocalStorage(userKey);
    if(userKey){
        return user.email
    }else{
        return null;
    }
}

// save to local storage
function saveToLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}


// Get data from local storage
function getFromLocalStorage(key){
    const value = localStorage.getItem(key);
    if(value){
        return JSON.parse(value);
    }else{
        return []
    }
}
function clearStorage(){
    localStorage.clear();
}




export{saveToken,saveUser, getUserName,getToken,getUserEmail,clearStorage}