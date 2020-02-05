import { expect } from 'chai';
import { RouteGuard } from "../src/core/route-guard.js";

const fakeTokenStore = {
    returnEmpty: true,
    get empty() {
        return this.returnEmpty;
    }
};
const publicRoutes = ['/a', '/b', '/c'];
const nonPublicRoutes = publicRoutes.map(e => `${e}_priv`);
const defaultRouteName = 'Default';
const routeGuard = new RouteGuard(fakeTokenStore, publicRoutes, defaultRouteName);

describe('RouteGuard tests', () => {
    for (let pr of publicRoutes) {
        it(`Allows entry to ${pr} public route`, () => {
            expect(routeGuard.allowsEntry(pr, '*')).to.equal(true);
        });
    }

    for (let npr of nonPublicRoutes) {
        it(`Allows entry to default route name for ${npr} route`, () => {
            expect(routeGuard.allowsEntry(npr, defaultRouteName)).to.equal(true);
        });
    }

    for (let npr of nonPublicRoutes) {
        it(`Allows entry for non public ${npr} route with token`, () => {
            fakeTokenStore.returnEmpty = false;
            expect(routeGuard.allowsEntry(npr, '*')).to.equal(true);     
        });
    }

    for (let npr of nonPublicRoutes) {
        it(`Denies entry to non public ${npr} route without token`, () => {
            fakeTokenStore.returnEmpty = true;
            expect(routeGuard.allowsEntry(npr, '*')).to.equal(true);   
        });
    }
});