export function isNameValid(name: string): boolean {
    if (name.length < 3) {
        return false;
    }
    for (const c of name) {
        if (!isLetter(c)) {
            return false;
        }
    }
    return true;
}

function isLetter(c: string): boolean {
    return c.toLowerCase() != c.toUpperCase();
}

export function isEmailValid(email: string): boolean {
    return /.{2,}@.{2,}\..{2,}/.test(email);
}

export function isPasswordValid(password: string): boolean {
    if (password.length < 8) {
        return false;
    }
    let digit = false;
    let upperCase = false;
    let lowerCase = false;
    for (const c of password) {
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