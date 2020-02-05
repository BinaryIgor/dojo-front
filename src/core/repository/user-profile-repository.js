export class UserProfileRepository {

    constructor(smartRequests, endpoints) {
        this._requests = smartRequests;
        this._currentUserProfileEndpoint = endpoints.currentUserProfile;
    }

    findCurrentUserProfile() {
        return this._requests.getJson(this._currentUserProfileEndpoint);
    }
}