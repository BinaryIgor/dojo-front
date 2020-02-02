import *  as validator from "../validator.js";

export class SignUpService {

    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    signUp(newUserInput) {
        let formErrors = this._validate(newUserInput);
        let response;
        if (validator.hasErrors(formErrors)) {
            response = Promise.resolve(new SignUpResponse(formErrors, []));
        } else {
            let newUser = {
                name: newUserInput.name,
                email: newUserInput.email,
                password: newUserInput.password
            };
            response = this._userRepository.createNewUser(newUser).then(r => {
                let exceptions;
                if (r.success) {
                    exceptions = [];
                } else {
                    exceptions = r.exceptions;
                }
                return new SignUpResponse(formErrors, exceptions);
            });
        }
        return response;
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