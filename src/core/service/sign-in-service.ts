import * as validator from "../validator";
import InputResponse from "../response/input-response";
import SignInInputErrors from "../error/sign-in-input-errors";
import TokenRepository from "../repository/token-repository";
import SignInInput from "../model/input/sign-in-input";
import { Empty, InputResponsePromise } from "../types";
import { toTokenRequest } from "../mapper/input-mapper";
import TokenStore from "../store/token-store";

export default class SignInService {

    private readonly tokenRepository: TokenRepository
    private readonly tokenStore: TokenStore

    constructor(tokenRepository: TokenRepository, tokenStore: TokenStore) {
        this.tokenRepository = tokenRepository;
        this.tokenStore = tokenStore;
    }

    signIn(input: SignInInput): InputResponsePromise<Empty, SignInInputErrors> {
        const inputErrors = this.validateInput(input);
        if (inputErrors.hasAny()) {
            return InputResponse.failure<Empty, SignInInputErrors>(inputErrors).asPromise();
        }

        return this.tokenRepository.getOne(toTokenRequest(input)).then(r => {
            if (r.success) {
                this.tokenStore.save(r.value);
            }
            return InputResponse.fromResponse(r, inputErrors);
        });

    }

    private validateInput(input: SignInInput): SignInInputErrors {
        let nameError: boolean;
        let emailError: boolean;
        if (input.nameOrEmail.indexOf('@') >= 0) {
            nameError = false;
            emailError = !validator.isEmailValid(input.nameOrEmail);
        } else {
            nameError = !validator.isNameValid(input.nameOrEmail);
            emailError = false;
        }
        const passwordError = !validator.isPasswordValid(input.password);
        return new SignInInputErrors(nameError, emailError, passwordError);
    }
}