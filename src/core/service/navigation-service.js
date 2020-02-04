export class NavigationService {

    constructor(navigationRoutes) {
        this._navigationRoutes = navigationRoutes;
    }

    resolveState(route) {
        let visible = this._navigationRoutes.filter(r => route.indexOf(r) == 0).length > 0;
        let navigationState = {};
        for (let nr of this._navigationRoutes) {
            navigationState[this._createNavigationKey(nr)] = route.indexOf(nr) == 0;
        }
        return new NavigationResponse(visible, navigationState);
    }

    _createNavigationKey(route) {
        return `${route.substring(1)}Active`;
    }
}

class NavigationResponse {

    constructor(visible, navigationState) {
        this.visible = visible;
        this.navigationState = navigationState;
    }
}