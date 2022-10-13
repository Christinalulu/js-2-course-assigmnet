function validateEmail(email) {
    const registerEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return email.match(registerEmail) ? true : false;
}

function validatePasswords(password, confirmPassword) {
    console.log(password)
    console.log(confirmPassword)
    if (!password) {
        return false;
    }
    if (!confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}
export {validateEmail, validatePasswords}