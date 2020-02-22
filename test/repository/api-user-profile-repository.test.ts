import { expect } from 'chai';
import FakeSmartRequests from "../fake/fake-smart-requests";
import ApiUserProfileRepository from "@/core/repository/api-user-profile-repository";
//import UserProfileUpdate from "@/core/model/user-profile-update";
//import PasswordUpdate from "@/core/model/password-update";
import UserProfile from "@/core/model/user-profile";
import * as expectations from "../expectation/response-expectation";
import Response from "@/core/response/response";

const fakeRequests = new FakeSmartRequests();
const userProfileEndpoint = "user/profile";
const userProfileImageUploadEndpoint = "user/profile/image";
const passwordUpdateEnpoint = "user/profile/password";
const imagesEndpointPrefix = "image";
const repository = new ApiUserProfileRepository(fakeRequests, userProfileEndpoint,
    userProfileImageUploadEndpoint, passwordUpdateEnpoint, imagesEndpointPrefix);


describe('ApiUserProfileRepository tests', () => {
    it('Returns current user', () => {
        const expectedUser = new UserProfile('name', 'name@email.com', '1/profile.jpg');
        const expectedCapturedImagePath = `${imagesEndpointPrefix}/${expectedUser.imagePath}`;
        const expectedBlobUrl = "blob:http://localhost:8081/1a075489-d34f-4293-9bba-0aa3f478c11d";
        fakeRequests.expectedResponse = Response.successOf(expectedUser);
        fakeRequests.expectedBlobResponse = Response.successOf(expectedBlobUrl);

        return repository.getCurrent().then(r => {
            expectations.expectSuccess(r, expectedUser);
            expect(fakeRequests.capturedUrl).to.equal(userProfileEndpoint);
            expect(fakeRequests.capturedBlobUrl).to.equal(expectedCapturedImagePath);
        });
    });
});

