export class StartService {

    constructor(tokenStore) {
        this._tokenStore = tokenStore;
    }

    needToSignIn() {
        return this._tokenStore.empty;
    }
}