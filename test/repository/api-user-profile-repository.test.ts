import { expect } from 'chai';
import FakeSmartRequests from "../fake/fake-smart-requests";
import ApiUserProfileRepository from "@/core/repository/api-user-profile-repository";
import UserProfileUpdate from "@/core/model/user-profile-update";
import PasswordUpdate from "@/core/model/password-update";
import UserProfile from "@/core/model/user-profile";
import * as expectations from "../expectation/response-expectations";
import Response from "@/core/response/response";

const fakeRequests = new FakeSmartRequests();
const userProfileEndpoint = "user/profile";
const userProfileImageUploadEndpoint = "user/profile/image";
const passwordUpdateEnpoint = "user/profile/password";
const imagesEndpointPrefix = "image";
const imagePlaceholderPath = 'placeholder.jpg';
const repository = new ApiUserProfileRepository(fakeRequests, userProfileEndpoint,
    userProfileImageUploadEndpoint, passwordUpdateEnpoint, imagesEndpointPrefix, 
    imagePlaceholderPath);


describe('ApiUserProfileRepository tests', () => {
    it('Returns current user', async () => {
        const expectedUser = provideProperUserProfile();
        const expectedCapturedImagePath = `${imagesEndpointPrefix}/${expectedUser.imagePath}`;
        const expectedBlobUrl = "blob:http://localhost:8081/1a075489-d34f-4293-9bba-0aa3f478c11d";
        fakeRequests.expectedResponse = Response.successOf(expectedUser);
        fakeRequests.expectedBlobResponse = Response.successOf(expectedBlobUrl);

        const mutatedExpectedUser = new UserProfile(expectedUser.name, expectedUser.email,
            expectedBlobUrl);

        const response = await repository.getCurrent();
 
        expectations.expectSuccess(response, mutatedExpectedUser);
        expect(fakeRequests.capturedUrl).to.equal(userProfileEndpoint);
        expect(fakeRequests.capturedBlobUrl).to.equal(expectedCapturedImagePath);
    });

    it('Returns current user with image placeholder', async () => {
        const expectedUser = provideProperUserProfile();
        expectedUser.imagePath = "";

        fakeRequests.expectedResponse = Response.successOf(expectedUser);

        const mutatedExpectedUser = new UserProfile(expectedUser.name, expectedUser.email, imagePlaceholderPath);

        const response = await repository.getCurrent();
        
        expectations.expectSuccess(response, mutatedExpectedUser);
    });

    it('Does not return current user on get image failure', async () => {
        const expectedErrors = ['IMAGE_DOES_NOT_EXIST'];
        fakeRequests.expectedResponse = Response.successOf(new UserProfile("name", "email@email.com", "/image"));
        fakeRequests.expectedBlobResponse = Response.failure(expectedErrors);

        const response = await repository.getCurrent();
        expectations.expectFailure(response, expectedErrors);
    });

    it('Uploads image', async () => {
        const expectedImagePath = '1/1/profile.jpg';
        fakeRequests.expectedResponse = Response.successOf(expectedImagePath);

        const image = new File(["Complex image"], "image.jpg", { type: 'text/plain' });
        const expectedForm = new FormData();
        expectedForm.append('image', image, image.name);

        const response = await repository.uploadImage(image);
        
        expectations.expectSuccess(response, expectedImagePath);
        expect(fakeRequests.capturedUrl).to.equal(userProfileImageUploadEndpoint);
        expect(fakeRequests.capturedFormData).to.deep.equal(expectedForm);
    });

    it('Updates profile', async () => {
        const profileUpdate = new UserProfileUpdate('newName', 'newEmail');
        fakeRequests.expectedResponse = Response.success();

        const response = await repository.update(profileUpdate);

        expectations.expectSuccessEmptyValue(response);
        expect(fakeRequests.capturedUrl).to.equal(userProfileEndpoint);
        expect(fakeRequests.capturedData).to.deep.equal(profileUpdate);
    });

    it('Updates password', async () => {
        const passwordUpdate = new PasswordUpdate('oldPassword', 'newPassword');
        fakeRequests.expectedResponse = Response.success();
        
        const response = await repository.updatePassword(passwordUpdate);

        expectations.expectSuccessEmptyValue(response);
        expect(fakeRequests.capturedUrl).to.equal(passwordUpdateEnpoint);
        expect(fakeRequests.capturedData).to.deep.equal(passwordUpdate);
    });
});

function provideProperUserProfile(): UserProfile {
    return new UserProfile('name', 'name@email.com', '1/profile.jpg');
}

