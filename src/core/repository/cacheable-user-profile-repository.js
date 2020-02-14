import {Response} from "../model/response.js";

export class CacheableUserProfileRepository {

    constructor(userProfileRepository) {
        this._userProfileRepository = userProfileRepository;
        this._cachedUserProfileResponse = Response.failure();
    }

    findCurrentUserProfile() {
        if (this._cachedUserProfileResponse.success) {
            return Promise.resolve(this._cachedUserProfileResponse);
        }

        return this._userProfileRepository.findCurrentUserProfile().then(r => {
            if (r.success) {
                this._cachedUserProfileResponse = r;
            }
            return r;
        });
    }
}