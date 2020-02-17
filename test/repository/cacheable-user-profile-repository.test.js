import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { CacheableUserProfileRepository } from "../../src/core/repository/cacheable-user-profile-repository.js";
import { UserProfileRepositoryFake } from '../fake/user-profile-repository-fake.js';

const repositoryFake = new UserProfileRepositoryFake();
const repository = new CacheableUserProfileRepository(repositoryFake);

describe('CacheableUserRepository tests', () => {
    it('Caches repository response', () => {
        let firstUser = provideUser();
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

    it('Invalidates cache after image upload', () => {
        repository.invalidateCache();

        let firstUser = provideUser();
        repositoryFake.expectedResponse = Response.successOf(firstUser);
        let newImagePath = '1/1/profile.jpg';
        let secondUser = provideAnotherUser();

        return repository.findCurrentUserProfile().then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(firstUser);

            repositoryFake.expectedResponse = Response.successOf(newImagePath);
            let image = new Blob(["Complex image"], { type: 'text/plain', name: 'image' });

            return repository.uploadUserProfileImage(image);
        }).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.equal(newImagePath);

            repositoryFake.expectedResponse = Response.successOf(secondUser);

            return repository.findCurrentUserProfile();
        }).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(secondUser);
        });
    });

    it('Invalidates cache after profile update', () => {
        repository.invalidateCache();

        let firstUser = provideUser();
        repositoryFake.expectedResponse = Response.successOf(firstUser);
        let secondUser = provideAnotherUser();

        return repository.findCurrentUserProfile().then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(firstUser);

            repositoryFake.expectedResponse = Response.success();

            return repository.updateUserProfile({
                newName: secondUser.name,
                newEmail: secondUser.email
            });
        }).then(r => {
            expect(r.success).to.equal(true);

            repositoryFake.expectedResponse = Response.successOf(secondUser);

            return repository.findCurrentUserProfile();
        }).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(secondUser);
        });
    });
});


function provideUser() {
    return {
        name: 'first',
        email: 'first@first.com',
        imagePath: 'image.jpg'
    };
}

function provideAnotherUser() {
    return {
        name: 'another',
        email: 'another@another.com',
        imagePath: 'another_image.jpg'
    };
}