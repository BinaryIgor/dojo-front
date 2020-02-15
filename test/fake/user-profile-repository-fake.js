export class UserProfileRepositoryFake {

    constructor() {
        this.expectedResponse = null;
        this.capturedImage = null;
    }

    findCurrentUserProfile() {
        return Promise.resolve(this.expectedResponse);
    }

    uploadUserProfileImage(image) {
        this.capturedImage = image;
        return Promise.resolve(this.expectedResponse);
    }    
}