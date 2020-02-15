import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { UserProfileRepository } from "../../src/core/repository/user-profile-repository.js";
import {SmartRequestsFake} from "../fake/smart-requests-fake.js";

const endpoints = {
    currentUserProfile: 'user/profile'
};
const imagesEndpointPrefix = 'image';

const requestsFake = new SmartRequestsFake();
const repository = new UserProfileRepository(requestsFake, endpoints, imagesEndpointPrefix);

describe('UserProfileRepository tests', () => {
    it('Returns current user', () => {
        let expectedUser = {
            id: 1,
            name: "name",
            email: "name@email.com",
            imagePath: "1/profile.jpg"
        };
        let expectedCapturedImagePath = `${imagesEndpointPrefix}/${expectedUser.imagePath}`;
        let expectedBlobUrl = "blob:http://localhost:8081/1a075489-d34f-4293-9bba-0aa3f478c11d";    
        requestsFake.expectedResponse = Response.successOf(expectedUser);
        requestsFake.expectedBlobResponse = Response.successOf(expectedBlobUrl);

        return repository.findCurrentUserProfile().then(r => {            
            expect(requestsFake.capturedUrl).to.equal(endpoints.currentUserProfile);
            expect(requestsFake.capturedBlobUrl).to.equal(expectedCapturedImagePath);
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

    it('Uploades image', () => {
        let expectedImagePath = "1/1/profile.jpg";
        requestsFake.expectedResponse = Response.successOf(expectedImagePath);
        
        let image = new Blob(["Complex image"], {type: 'text/plain', name:'image'});
        let expectedForm = new FormData();
        expectedForm.append('image', image, image.name);

        return repository.uploadUserProfileImage(image).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.equal(expectedImagePath);

            expect(requestsFake.capturedFormData).to.deep.equal(expectedForm);
        });
    });
});