import { expect } from 'chai';
import { NavigationService } from "../src/core/service/navigation-service.js";

const navigationRoutes = [
    "/home", "/events", "/tasks", "/doers", "/profile"
];
const expectedNavigationState = {
    homeActive: false,
    eventsActive: false,
    tasksActive: false,
    doersActive: false,
    profileActive: false
};
const service = new NavigationService(navigationRoutes);

describe('NavigationService test', () => {
    for (let route of navigationRoutes) {
        it(`Resolves navigation state for ${route} route`, () => {
            for (let key in expectedNavigationState) {
                if (`/${key}`.indexOf(route) == 0) {
                    expectedNavigationState[key] = true;
                } else {
                    expectedNavigationState[key] = false;
                }
            }
            let response = service.resolveState(route);
            expect(response.visible).to.equal(true);
            expect(response.navigationState).to.include(expectedNavigationState);
        });
    }
});