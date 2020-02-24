import * as validator from "../validator";
import InputResponse from "../response/input-response";
import UserProfileUpdateInput from "../model/input/user-profile-update-input";
import UserProfileUpdateInputErrors from "../error/user-profile-update-input-errors";
import UserProfile from "../model/user-profile";
import PasswordUpdateInputErrors from "../error/password-update-input-errors";
import UserProfileRepository from "../repository/user-profile-repository";
import { InputResponsePromise, ResponsePromise, Empty } from "../types";
import { toUserProfileUpdate, toPasswordUpdate } from "../mapper/input-mapper";
import Response from '../response/response';
import PasswordUpdateInput from '../model/input/password-update-input';

export default class EditProfileService {

    private readonly userProfileRepository: UserProfileRepository

    constructor(userProfileRepository: UserProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    getProfile(): ResponsePromise<UserProfile> {
        return this.userProfileRepository.getCurrent();
    }

    uploadProfileImage(image: File): ResponsePromise<Empty> {
        return this.userProfileRepository.uploadImage(image);
    }

    shouldUpdateProfile(input: UserProfileUpdateInput): boolean {
        return (input.newName != '' && input.name != input.newName) ||
            (input.newEmail != '' && input.email != input.newEmail);
    }

    updateProfile(input: UserProfileUpdateInput):
        InputResponsePromise<UserProfile, UserProfileUpdateInputErrors> {
        const inputErrors = this.validateProfileUpdateInput(input);
        if (inputErrors.hasAny()) {
            return InputResponse.failure<UserProfile, UserProfileUpdateInputErrors>(inputErrors).asPromise();
        }

        const profileUpdate = toUserProfileUpdate(input);
        return this.userProfileRepository.update(profileUpdate)
            .then(r => {
                let response: ResponsePromise<UserProfile>;
                if (r.success) {
                    response = this.getProfile();
                } else {
                    response = Response.failure<UserProfile>(r.exceptions).asPromise();
                }
                return response;
            }).then(r => InputResponse.fromResponse(r, inputErrors));
    }

    private validateProfileUpdateInput(input: UserProfileUpdateInput):
        UserProfileUpdateInputErrors {
        if (input.newName == '') {
            input.newName = input.name;
        }
        if (input.newEmail == '') {
            input.newEmail = input.email;
        }
        const newNameError = !validator.isNameValid(input.newName);
        const newEmailError = !validator.isEmailValid(input.newEmail);
        return new UserProfileUpdateInputErrors(newNameError, newEmailError);
    }

    updatePassword(input: PasswordUpdateInput): InputResponsePromise<Empty, PasswordUpdateInputErrors> {
        const inputErrors = this.validatePasswordUpdateInput(input);
        if (inputErrors.hasAny()) {
            return InputResponse.failure<Empty, PasswordUpdateInputErrors>(inputErrors).asPromise();
        }

        const passwordUpdate = toPasswordUpdate(input);
        return this.userProfileRepository.updatePassword(passwordUpdate)
            .then(r => InputResponse.fromResponse(r, inputErrors));
    }

    private validatePasswordUpdateInput(input: PasswordUpdateInput): PasswordUpdateInputErrors {
        const oldPasswordError = !validator.isPasswordValid(input.oldPassword);
        const newPasswordError = !validator.isPasswordValid(input.newPassword);
        const reapeatedNewPasswordError = !(newPasswordError || input.reapeatedNewPassword == input.newPassword);
        return new PasswordUpdateInputErrors(oldPasswordError, newPasswordError, reapeatedNewPasswordError);
    }
}