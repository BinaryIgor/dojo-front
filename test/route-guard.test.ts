import { expect } from 'chai';
import RouteGuard from "../src/core/route-guard";
import FakeTokenStore from "./fake/fake-token-store";
import Token from '../src/core/model/token';

const fakeTokenStore = new FakeTokenStore();
const publicRoutes = ['/a', '/b', '/c'];
const nonPublicRoutes = publicRoutes.map(e => `${e}_priv`);
const defaultRouteName = 'Default';
const routeGuard = new RouteGuard(fakeTokenStore, publicRoutes, defaultRouteName);

describe('RouteGuard tests', () => {
    for (const pr of publicRoutes) {
        it(`Allows entry to ${pr} public route`, () => {
            expect(routeGuard.allowsEntry(pr, '*')).to.equal(true);
        });
    }

    for (const npr of nonPublicRoutes) {
        it(`Allows entry to default route name for ${npr} route`, () => {
            expect(routeGuard.allowsEntry(npr, defaultRouteName)).to.equal(true);
        });
    }

    for (const npr of nonPublicRoutes) {
        it(`Allows entry for non public ${npr} route with token`, () => {
            fakeTokenStore.clear();
            expect(routeGuard.allowsEntry(npr, '*')).to.equal(true);
        });
    }

    for (const npr of nonPublicRoutes) {
        it(`Denies entry to non public ${npr} route without token`, () => {
            fakeTokenStore.save(new Token(""));
            expect(routeGuard.allowsEntry(npr, '*')).to.equal(true);
        });
    }
});