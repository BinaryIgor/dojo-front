import *  as validator from "../validator.js";
import { InputResponse } from "./input-response.js";
import { UserProfileUpdate } from "../model/user-profile-update.js";

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
        let inputErrors = this._validate(userProfileUpdate, previousUserProfile);
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

    _validate(userProfileUpdate, previousUserProfile) {
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
}