import TokenStore from "./store/token-store";

export default class RouteGuard {

    private readonly tokenStore: TokenStore;
    private readonly publicRoutes: string[];
    public readonly defaultRouteName: string;

    constructor(tokenStore: TokenStore, publicRoutes: string[], defaultRouteName: string) {
        this.tokenStore = tokenStore;
        this.publicRoutes = publicRoutes;
        this.defaultRouteName = defaultRouteName;
    }

    allowsEntry(route: string, matchedRouteName: string) {
        return !this.tokenStore.isEmpty() ||
            this.defaultRouteName == matchedRouteName ||
            this.publicRoutes.filter(e => route.indexOf(e) == 0).length > 0;
    }
}