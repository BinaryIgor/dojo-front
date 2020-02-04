export class NavigationService {

    constructor(navigationRoutes, defaultRouteName) {
        this._navigationRoutes = navigationRoutes;
        this._defaultRouteName = defaultRouteName;
    }

    resolveState(route, matchedName) {
        if (matchedName == this._defaultRouteName) {
            return new NavigationResponse(false, this._createFalseNavigationState());
        }

        let visible = this._navigationRoutes.filter(r => route.indexOf(r) == 0).length > 0;
        let navigationState = this._createNavigationState(route);
        return new NavigationResponse(visible, navigationState);
    }

    _createFalseNavigationState() {
        return this._createNavigationState(null);
    }

    _createNavigationState(route) {
        let navigationState = {};
        for (let nr of this._navigationRoutes) {
            navigationState[this._createNavigationKey(nr)] = route == null ? false : route.indexOf(nr) == 0;
        }
        return navigationState;
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