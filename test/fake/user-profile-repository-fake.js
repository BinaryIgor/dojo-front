export class UserProfileRepositoryFake {

    constructor() {
        this.expectedResponse = null;
    }

    findCurrentUserProfile() {
        return Promise.resolve(this.expectedResponse);
    }
}