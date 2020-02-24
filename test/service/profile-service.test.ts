import { expect } from 'chai';
import Response from "@/core/response/response";
import ProfileService from "@/core/service/profile-service";
import FakeTokenStore from "../fake/fake-token-store";
import FakeUserProfileRepository from '../fake/fake-user-profile-repository';
import UserProfile from "@/core/model/user-profile";
import * as expectations from "../expectation/response-expectations";
import Token from "@/core/model/token";

const fakeRepository = new FakeUserProfileRepository();
const fakeTokenStore = new FakeTokenStore();
const service = new ProfileService(fakeTokenStore, fakeRepository);

describe('ProfileService tests', () => {
    it('Returns current user profile', async () => {
        const expectedUserProfile = new UserProfile("user@email.com", "User",
            "blob:http://localhost:8081/1a075489-d34f-4293-9bba-0aa3f478c11d");
        fakeRepository.expectedResponse = Response.successOf(expectedUserProfile);

        const response = await service.getProfile();

        expectations.expectSuccess(response, expectedUserProfile);
    });

    it('Propagates repository error', async () => {
        const expectedErrors = ['USER_DOES_NOT_EXIST'];
        fakeRepository.expectedResponse = Response.failure(expectedErrors);

        const response = await service.getProfile();

        expectations.expectFailure(response, expectedErrors);
    });

    it('Clears token on sign out', () => {
        const token = new Token('fake');
        fakeTokenStore.save(token);

        expect(fakeTokenStore.isEmpty()).to.equal(true);

        service.signOut();

        expect(fakeTokenStore.isEmpty()).to.equal(false);
    });
});