const tokenKey = "token"
const userKey = "user"

function saveToken(token){
    saveToLocalStorage(tokenKey, token)
}

// Get Token
function getToken(){
    return getFromLocalStorage(tokenKey)
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




export{saveToken,saveUser, getUserName,getToken}