import NewUser from "../model/new-user";
import NewUserInput from "../model/input/new-user-input";
import SignInInput from "../model/input/sign-in-input";
import TokenRequest from "../model/token-request";

export function toNewUser(input: NewUserInput): NewUser {
    return new NewUser(input.name, input.email, input.password);
}

export function toTokenRequest(input: SignInInput): TokenRequest {
    return new TokenRequest(input.nameOrEmail, input.password);
}