export class NavigationService {

    constructor(private readonly navigationRoutes: string[], private readonly defaultRouteName: string) {
        this.navigationRoutes = navigationRoutes;
        this.defaultRouteName = defaultRouteName;
    }

    resolveState(route: string, matchedRoute: string): NavigationResponse {
        if (matchedRoute == this.defaultRouteName) {
            return new NavigationResponse(false, this.createFalseNavigationState());
        }

        const visible = this.navigationRoutes.filter(r => route?.indexOf(r) == 0).length > 0;
        const navigationState = this.createNavigationState(route);
        return new NavigationResponse(visible, navigationState);
    }

    private createFalseNavigationState(): Map<string, boolean> {
        return this.createNavigationState(null);
    }

    private createNavigationState(route: string | null): Map<string, boolean> {
        const navigationState = new Map<string, boolean>();
        for (const nr of this.navigationRoutes) {
            const active = route == null ? false : route.indexOf(nr) == 0;
            navigationState.set(this.createNavigationKey(nr), active);
        }
        return navigationState;
    }

    private createNavigationKey(route: string): string {
        const startsWithSlash = route.indexOf('/') == 0;
        return startsWithSlash ? `${route.substring(1)}Active` : `${route}Active`;
    }
}


export class NavigationResponse {

    constructor(readonly visible: boolean, readonly navigationState: Map<string, boolean>) {
        this.visible = visible;
        this.navigationState = navigationState;
    }
}