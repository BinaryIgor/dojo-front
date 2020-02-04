export class ProfileService {

    constructor(tokenStore) {
        this._tokenStore = tokenStore;
    }

    signOut() {
        this._tokenStore.clear();
    }
}