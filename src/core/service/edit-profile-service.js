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
}