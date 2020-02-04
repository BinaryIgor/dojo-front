import { expect } from 'chai';
import { NavigationService } from "../src/core/service/navigation-service.js";

const navigationRoutes = [
    "/home", "/events", "/tasks", "/doers", "/profile"
];
const defaultRouteName = 'Start';
const service = new NavigationService(navigationRoutes, defaultRouteName);

describe('NavigationService test', () => {
    for (let route of navigationRoutes) {
        it(`Resolves navigation state for ${route} route`, () => {
            let expectedNavigationState = getFalseNavigationState();
            expectedNavigationState[`${route.substring(1)}Active`] = true;

            let response = service.resolveState(route, '*');

            expect(response.visible).to.equal(true);
            expect(response.navigationState).to.include(expectedNavigationState);
        });
    }

    it('Returns all false for matched default route name', () => {
        let response = service.resolveState('route', defaultRouteName);

        expect(response.visible).to.equal(false);
        expect(response.navigationState).to.include(getFalseNavigationState());
    });
});

function getFalseNavigationState() {
    return {
        homeActive: false,
        eventsActive: false,
        tasksActive: false,
        doersActive: false,
        profileActive: false
    };
}