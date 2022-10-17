function validateEmailFrom(fromEmail) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    return fromEmail.match(regEx) ? true : false;
}


function validatePasswords(formPassword, formConfirmPassword) {
    if (!formPassword ) {
        return false;
    }
    if (!formConfirmPassword ) {
        return false;
    }
    if (formPassword !== formConfirmPassword  ) {
        return false;
    } else {
        return true;
    }
}

export {validateEmailFrom, validatePasswords}
