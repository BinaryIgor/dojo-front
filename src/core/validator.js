export function isNameValid(name) {
    if (name.length < 3) {
        return false;
    }
    for (let c of name) {
        if (!isLetter(c)) {
            return false;
        }
    }
    return true;
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

export function isEmailValid(email) {
    return /.{2,}@.{2,}\..{2,}/.test(email);
}

export function isPasswordValid(password) {
    if (password.length < 8) {
        return false;
    }
    let digit = false;
    let upperCase = false;
    let lowerCase = false;
    for (let c of password) {
        if (isLetter(c)) {
            if (!upperCase) {
                upperCase = c == c.toUpperCase();
            }
            if (!lowerCase) {
                lowerCase = c == c.toLowerCase();    
            }
        } 
        if (!digit && /\d/.test(c)) {
            digit = true;
        }

        if (digit && upperCase && lowerCase) {
            break;
        }
    }
    return digit && upperCase && lowerCase;
}

export function hasErrors(errorsObject) {
    for (let k in errorsObject) {
        if (errorsObject[k]) {
            return true;
        }
    }
    return false;
}