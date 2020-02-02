import *  as validator from "../validator.js";
import { FormResponse } from "./form-response.js";

export class SignUpService {

    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    signUp(newUserInput) {
        let formErrors = this._validate(newUserInput);
        let response;
        if (validator.hasErrors(formErrors)) {
            response = FormResponse.asPromise(formErrors);
        } else {
            let newUser = {
                name: newUserInput.name,
                email: newUserInput.email,
                password: newUserInput.password
            };
            response = this._userRepository.createNewUser(newUser)
                .then(r => FormResponse.fromResponse(formErrors, r));
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