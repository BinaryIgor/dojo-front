export class RouteGuard {

    constructor(tokenStore, publicRoutes, defaultRouteName) {
        this._tokenStore = tokenStore;
        this._publicRoutes = publicRoutes;
        this._defaultRouteName = defaultRouteName;
    }

    allowsEntry(route, matchedRouteName) {
        return !this._tokenStore.empty ||
            this._defaultRouteName == matchedRouteName ||
            this._publicRoutes.filter(e => route.indexOf(e) == 0).length > 0
    }
}