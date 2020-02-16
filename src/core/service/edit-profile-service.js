import *  as validator from "../validator.js";
import { InputResponse } from "./input-response.js";
import { UserProfileUpdate } from "../model/user-profile-update.js";
import { PasswordUpdate } from "../model/password-update.js";

export class EditProfileService {

    constructor(userProfileRepository) {
        this._userProfileRepository = userProfileRepository;
    }

    getCurrentUserProfile() {
        return this._userProfileRepository.findCurrentUserProfile();
    }

    uploadProfileImage(image) {
        return this._userProfileRepository.uploadUserProfileImage(image);
    }

    shouldUpdateProfile(name, newName, email, newEmail) {
        return (newName != '' && name != newName) || (newEmail != '' && email != newEmail);
    }

    updateProfile(userProfileUpdate, previousUserProfile) {
        let inputErrors = this._validateProfileUpdate(userProfileUpdate, previousUserProfile);
        let response;
        if (validator.hasErrors(inputErrors)) {
            response = InputResponse.inputFailure(inputErrors).asPromise();
        } else {
            let profileUpdate = new UserProfileUpdate(userProfileUpdate.newName, userProfileUpdate.newEmail);
            response = this._userProfileRepository.updateUserProfile(profileUpdate)
                .then(r => {
                    if (r.success) {
                        return this.getCurrentUserProfile();
                    }
                    return r;
                })
                .then(r => InputResponse.fromResponse(r, v => {
                    return {
                        name: v.name,
                        email: v.email
                    };
                }));
        }
        return response;
    }

    _validateProfileUpdate(userProfileUpdate, previousUserProfile) {
        let errors = {};
        if (userProfileUpdate.newName == '') {
            userProfileUpdate.newName = previousUserProfile.name;
        }
        if (userProfileUpdate.newEmail == '') {
            userProfileUpdate.newEmail = previousUserProfile.email;
        }
        errors.newNameError = !validator.isNameValid(userProfileUpdate.newName);
        errors.newEmailError = !validator.isEmailValid(userProfileUpdate.newEmail);
        return errors;
    }

    updatePassword(passwordUpdateInput) {
        let inputErrors = this._validatePasswordUpdate(passwordUpdateInput);
        let response;
        if (validator.hasErrors(inputErrors)) {
            response = InputResponse.inputFailure(inputErrors).asPromise();
        } else {
            let passwordUpdate = new PasswordUpdate(passwordUpdateInput.oldPassword, passwordUpdateInput.newPassword);
            response = this._userProfileRepository.updateUserPassword(passwordUpdate)
                .then(r => InputResponse.fromResponse(r));
        }
        return response;
    }

    _validatePasswordUpdate(passwordUpdateInput) {
        let errors = {};
        errors.oldPasswordError = !validator.isPasswordValid(passwordUpdateInput.oldPassword);
        errors.newPasswordError = !validator.isPasswordValid(passwordUpdateInput.newPassword);
        if (errors.newPasswordError) {
            errors.repeatedNewPasswordError = false;
        } else {
            errors.repeatedNewPasswordError = passwordUpdateInput.repeatedNewPassword !=
                passwordUpdateInput.newPassword;
        }
        return errors;
    }
}