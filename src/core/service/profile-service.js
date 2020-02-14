export class ProfileService {

    constructor(tokenStore, userProfileRepository) {
        this._tokenStore = tokenStore;
        this._userProfileRepository = userProfileRepository;
    }

    getProfile() {
        return this._userProfileRepository.findCurrentUserProfile();
    }

    signOut() {
        this._tokenStore.clear();
    }
}