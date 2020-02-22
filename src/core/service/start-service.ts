import TokenStore from "../store/token-store"

export default class StartService {

    private readonly tokenStore: TokenStore

    constructor(tokenStore: TokenStore) {
        this.tokenStore = tokenStore;
    }

    needToSignIn(): boolean {
        return this.tokenStore.isEmpty();
    }
}