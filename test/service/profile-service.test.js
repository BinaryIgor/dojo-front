import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { ProfileService } from "../../src/core/service/profile-service.js";
import { UserProfileRepositoryFake } from "../fake/user-profile-repository-fake.js";
import { TokenStoreFake } from "../fake/token-store-fake.js";

const repositoryFake = new UserProfileRepositoryFake();
const tokenStoreFake = new TokenStoreFake();
const service = new ProfileService(tokenStoreFake, repositoryFake);

describe('ProfileService tests', () => {
    it('Returns current user profile', () => {
        let expectedUserProfile = {
            email: "user@email.com",
            name: 'User',
            imagePath: "blob:http://localhost:8081/1a075489-d34f-4293-9bba-0aa3f478c11d"
        };
        repositoryFake.expectedResponse = Response.successOf(expectedUserProfile);

        return service.getProfile().then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.eq(expectedUserProfile);
        });
    });

    it('Propagates repository error', () => {
        let expectedError = 'USER_DOES_NOT_EXIST';
        repositoryFake.expectedResponse = Response.failure([expectedError]);
        
        return service.getProfile().then(r => {
            expect(r.success).to.equal(false);
            expect(r.exceptions).to.deep.equal([expectedError]);
        });
    });

    it('Clears token on sign out', () => {
        let token = {token: 'fake'};
        tokenStoreFake.save(token);

        expect(tokenStoreFake.empty).to.equal(false);

        service.signOut();

        expect(tokenStoreFake.empty).to.equal(true);
    });
});