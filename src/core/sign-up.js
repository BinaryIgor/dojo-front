const model = {
    name: "",
    nameError: false,
    email: "",
    emailError: false,
    password: "",
    repeatedPassword: ""
};

export const signUpModule = {
    model: model,
    methods: {
        validate() {
            model.nameError = model.name.length == 0;
            model.emailError = model.email.length == 0 || model.email.indexOf('@') > 0;
        }
    }
};