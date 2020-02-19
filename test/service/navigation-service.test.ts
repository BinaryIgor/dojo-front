import { expect } from 'chai';
import { NavigationService } from "../../src/core/service/navigation-service";

const navigationRoutes = ["/first", "/second", "/third", "/fourth"];
const defaultRouteName = 'Start';
const service = new NavigationService(navigationRoutes, defaultRouteName);

describe('NavigationService tests', () => {
    for (const route of navigationRoutes) {
        it(`Resolves navigation state for ${route} route`, () => {
            const expectedNavigationState = getFalseNavigationState();
            expectedNavigationState.set(createNavigationStateKey(route), true);

            const response = service.resolveState(route, "*");

            expect(response.visible).to.equal(true);
            expect(response.navigationState).to.deep.equal(expectedNavigationState);
        });
    }

    const falseNavigationState = getFalseNavigationState();
    for (const route of navigationRoutes.concat(['/x', '/y'])) {
        it(`Resolves false navigation state for route ${route} and matched route name`, () => {
            const response = service.resolveState(route, defaultRouteName);

            expect(response.visible).to.equal(false);
            expect(response.navigationState).to.deep.equal(falseNavigationState);
        });
    }
});

function createNavigationStateKey(route: string): string {
    return `${route.substring(1)}Active`;
}

function getFalseNavigationState(): Map<string, boolean> {
    const navigationState = new Map<string, boolean>();
    for (const route of navigationRoutes) {
        const key = createNavigationStateKey(route);
        navigationState.set(key, false);
    }
    return navigationState;
}