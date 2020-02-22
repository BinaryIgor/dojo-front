import { ResponsePromise, Empty } from "../types";
import Response from "../response/response";
import UserProfile from "../model/user-profile";
import UserProfileUpdate from "../model/user-profile-update";
import PasswordUpdate from "../model/password-update";
import UserProfileRepository from './user-profile-repository';

export default class CacheableUserProfileRepository implements UserProfileRepository {

    private readonly base: UserProfileRepository
    private cachedUserProfileResponse: Response<UserProfile> | null

    constructor(base: UserProfileRepository) {
        this.base = base;
        this.cachedUserProfileResponse = null;
    }

    getCurrent(): ResponsePromise<UserProfile> {
        if (Response.isNullOrFailure(this.cachedUserProfileResponse)) {
            return this.base.getCurrent().then(r => {
                if (r.success) {
                    this.cachedUserProfileResponse = r;
                }
                return r;
            });
        }

        return Promise.resolve(this.cachedUserProfileResponse as Response<UserProfile>);
    }

    uploadImage(image: File): ResponsePromise<Empty> {
        return this.base.uploadImage(image).then(r => {
            if (r.success) {
                this.invalidateCache();
            }
            return r;
        });
    }

    private invalidateCache(): void {
        this.cachedUserProfileResponse = null;
    }

    update(profile: UserProfileUpdate): ResponsePromise<Empty> {
        return this.base.update(profile).then(r => {
            if (r.success) {
                this.invalidateCache();
            }
            return r;
        });
    }

    updatePassword(password: PasswordUpdate): ResponsePromise<Empty> {
        return this.base.updatePassword(password);
    }
}