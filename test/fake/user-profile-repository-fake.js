export class UserProfileRepositoryFake {

    constructor() {
        this.expectedResponse = null;
        this.capturedProfileUpdate = null;
        this.capturedImage = null;
    }

    findCurrentUserProfile() {
        return Promise.resolve(this.expectedResponse);
    }

    updateUserProfile(userProfileUpdate) {
        this.capturedProfileUpdate = userProfileUpdate;
        return Promise.resolve(this.expectedResponse);
    }

    uploadUserProfileImage(image) {
        this.capturedImage = image;
        return Promise.resolve(this.expectedResponse);
    }    
}