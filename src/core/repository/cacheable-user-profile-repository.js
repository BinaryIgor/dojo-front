import { Response } from "../model/response.js";

export class CacheableUserProfileRepository {

    constructor(userProfileRepository) {
        this._userProfileRepository = userProfileRepository;
        this._cachedUserProfileResponse = null;
    }

    findCurrentUserProfile() {
        if (Response.isNullOrFailure(this._cachedUserProfileResponse)) {
            return this._userProfileRepository.findCurrentUserProfile().then(r => {
                if (r.success) {
                    this._cachedUserProfileResponse = r;
                }
                return r;
            });
        }

        return Promise.resolve(this._cachedUserProfileResponse);
    }

    uploadUserProfileImage(image) {
        return this._userProfileRepository.uploadUserProfileImage(image).then(r => {
            if (r.success) {
                this._cachedUserProfileResponse = null;
            }
            return r;
        });
    }
}