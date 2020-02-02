import *  as validator from "../validator.js";

export class SignUpService {

    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    signUp(newUserInput) {
        let errors = this._validate(newUserInput);
        let promise;
        if (validator.hasErrors(errors)) {
            promise = Promise.resolve(new SignUpResponse(errors, []));
        } else {
            let newUser = {
                name: newUserInput.name,
                email: newUserInput.email,
                password: newUserInput.password
            };
            promise = this._userRepository.createNewUser(newUser).then(r => {
                let exceptions;
                if (r.success) {
                    exceptions = [];
                } else {
                    exceptions = r.exceptions;
                }
                return new SignUpResponse(errors, exceptions);
            });
        }
        return promise;
    }

    _validate(newUserInput) {
        let errors = {};
        errors.nameError = !validator.isNameValid(newUserInput.name);
        errors.emailError = !validator.isEmailValid(newUserInput.email);
        errors.passwordError = !validator.isPasswordValid(newUserInput.password);
        if (errors.passwordError) {
            errors.repeatedPasswordError = false;
        } else {
            errors.repeatedPasswordError = newUserInput.password != newUserInput.repeatedPassword;
        }
        return errors;
    }
}

class SignUpResponse {

    constructor(formErrors, signUpErrors) {
        this.formErrors = formErrors;
        this.signUpErrors = signUpErrors;
    }

    get success() {
        return !validator.hasErrors(this.formErrors) && this.signUpErrors.length == 0;
    }
}