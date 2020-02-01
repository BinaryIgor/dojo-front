import *  as validator from "../validator.js";

export class SignUpService {

    constructor(userRepository) {
        this.model = {
            name: "",
            nameError: false,
            email: "",
            emailError: false,
            password: "",
            passwordError: false,
            repeatedPassword: "",
            repeatedPasswordError: false,
            signingUp: false,
            signedUp: false,
            exceptions: []
        };
        this.methods = createMethods(this.model, userRepository);
    }
}

function createMethods(model, userRepository) {
    return {
        _validate() {
            model.nameError = !validator.isNameValid(model.name);
            model.emailError = !validator.isEmailValid(model.email);
            model.passwordError = !validator.isPasswordValid(model.password);
            if (model.passwordError) {
                model.repeatedPasswordError = false;
            } else {
                model.repeatedPasswordError = model.password != model.repeatedPassword;
            }
            return !(model.nameError | model.emailError | model.passwordError | model.repeatedPasswordError);
        },
        signUp() {
            if (this._validate()) {
                let newUser = {
                    name: model.name,
                    email: model.email,
                    password: model.password
                };
                model.signingUp = true;
                userRepository.createNewUser(newUser, r => {
                    model.signingUp = false;
                    if (r.success) {
                        model.signedUp = true;
                    } else {
                        model.exceptions = r.exceptions;
                    }
                });
            } 
        }
    };
}