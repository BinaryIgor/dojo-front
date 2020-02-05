import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { UserProfileRepository } from "../../src/core/repository/user-profile-repository.js";
import {SmartRequestsFake} from "../fake/smart-requests-fake.js";

const endpoints = {
    currentUserProfile: 'user/profile'
};
const requestsFake = new SmartRequestsFake();
const repository = new UserProfileRepository(requestsFake, endpoints);

describe('UserProfileRepository tests', () => {
    it('Returns current user', () => {
        let expectedUser = {
            id: 1,
            name: "name",
            email: "name@email.com",
            imagePath: "https://secret-images.com/1"
        };
        requestsFake.expectedResponse = Response.successOf(expectedUser);

        return repository.findCurrentUserProfile().then(r => {
            expect(requestsFake.capturedUrl).to.equal(endpoints.currentUserProfile);
            expect(r.success).to.equal(true);
            expect(r.value).to.eq(expectedUser);
        });
    });

    it('Propagates errors', () => {
        let expectedException = "USER_DOES_NOT_EXIST";
        requestsFake.expectedResponse = Response.failure([expectedException]);

        return repository.findCurrentUserProfile().then(r => {
            expect(r.success).to.equal(false);
            expect(r.exceptions).to.include(expectedException);
        });
    });
});