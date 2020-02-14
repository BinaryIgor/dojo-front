import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { CacheableUserProfileRepository } from "../../src/core/repository/cacheable-user-profile-repository.js";
import { UserProfileRepositoryFake } from '../fake/user-profile-repository-fake.js';


const repositoryFake = new UserProfileRepositoryFake();
const repository = new CacheableUserProfileRepository(repositoryFake);

describe('CacheableUserRepository tests', () => {
    it('Caches repository response', () => {
        let firstUser = {
            name: 'first',
            email: 'first@first.com',
            imagePath: 'image.jpg'
        };
        repositoryFake.expectedResponse = Response.successOf(firstUser);

        return repository.findCurrentUserProfile().then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(firstUser);

            repositoryFake.expectedResponse = Response.failure(['FAIL']);

            return repository.findCurrentUserProfile();
        }).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(firstUser);
        });

    });
});
