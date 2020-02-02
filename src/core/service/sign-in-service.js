import *  as validator from "../validator.js";
import { FormResponse } from "./form-response.js";

export class SignInService {

    constructor(userRepository, tokenStorage) {
        this._userRepository = userRepository;
        this._tokenStorage = tokenStorage;
    }

    signIn(userInput) {
        let formErrors = this._validate(userInput);
        let response;
        if (validator.hasErrors(formErrors)) {
            response = FormResponse.asPromise(formErrors);
        } else {
            response = this._userRepository.matchUser(userInput.nameOrEmail, userInput.password)
                .then(r => {
                    if (r.success) {
                        this._tokenStorage.save(r.value);
                    }
                    return FormResponse.fromResponse(formErrors, r);
                });
        }
        return response;
    }

    _validate(userInput) {
        let errors = {};
        if (userInput.nameOrEmail.indexOf('@') == -1) {
            errors.nameError = !validator.isNameValid(userInput.nameOrEmail);
            errors.emailError = false;
        } else {
            errors.nameError = false;
            errors.emailError = !validator.isEmailValid(userInput.nameOrEmail);
        }
        errors.passwordError = !validator.isPasswordValid(userInput.password);
        return errors;
    }
}
