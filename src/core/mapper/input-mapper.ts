import NewUser from "../model/new-user";
import NewUserInput from "../model/input/new-user-input";
import SignInInput from "../model/input/sign-in-input";
import TokenRequest from "../model/token-request";
import UserProfileUpdateInput from "../model/input/user-profile-update-input";
import UserProfileUpdate from "../model/user-profile-update";
import PasswordUpdateInput from "../model/input/password-update-input";
import PasswordUpdate from "../model/password-update";

export function toNewUser(input: NewUserInput): NewUser {
    return new NewUser(input.name, input.email, input.password);
}

export function toTokenRequest(input: SignInInput): TokenRequest {
    return new TokenRequest(input.nameOrEmail, input.password);
}

export function toUserProfileUpdate(input: UserProfileUpdateInput): UserProfileUpdate {
    return new UserProfileUpdate(input.newName, input.newEmail);
}

export function toPasswordUpdate(input: PasswordUpdateInput): PasswordUpdate {
    return new PasswordUpdate(input.oldPassword, input.newPassword);
}