import * as validator from "../validator";
import { InputResponse } from "../response/input-response";
import { NewUserInputErrors } from "../error/new-user-input-errors";
import { UserRepository } from "../repository/user-repository";
import { NewUserInput } from "../model/input/new-user-input";
import { NewUser } from "../model/new-user";
import { Empty, InputResponsePromise } from "../types";

export class SignUpService {

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    signUp(input: NewUserInput): InputResponsePromise<Empty, NewUserInputErrors> {
        const inputErrors = this.validateInput(input);
        let response: InputResponsePromise<any, NewUserInputErrors>;
        if (inputErrors.hasAny()) {
            response = InputResponse.failure(inputErrors).asPromise();
        } else {
            const newUser = new NewUser(input.name, input.email, input.password);
            response = this.userRepository.createNewUser(newUser).then(r =>
                InputResponse.fromResponse(r, inputErrors));
        }
        return response;
    }

    private validateInput(input: NewUserInput): NewUserInputErrors {
        const nameError = !validator.isNameValid(input.name);
        const emailError = !validator.isEmailValid(input.email);
        const passwordError = !validator.isPasswordValid(input.password);
        const repeatedPasswordError = passwordError ? false : input.password != input.repeatedPassword;
        return new NewUserInputErrors(nameError, emailError, passwordError, repeatedPasswordError);
    }
}