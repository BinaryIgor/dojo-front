export class NavigationResponse {

    constructor(readonly visible: boolean, readonly navigationState: string[]) {
        this.visible = visible;
        this.navigationState = navigationState;
    }
}