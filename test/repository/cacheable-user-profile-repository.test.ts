import FakeUserProfileRepository from "../fake/fake-user-profile-repository";
import CacheableUserProfileRepository from "@/core/repository/cacheable-user-profile-repository";
import UserProfileUpdate from "@/core/model/user-profile-update";
import UserProfile from "@/core/model/user-profile";
import * as expectations from "../expectation/response-expectation";
import Response from "@/core/response/response";

const fakeRepository = new FakeUserProfileRepository();
let repository: CacheableUserProfileRepository;


describe('CacheableUserProfileRepository tests', () => {
    beforeEach(() => {
        repository = new CacheableUserProfileRepository(fakeRepository);
    });

    it('Caches repository response', async () => {
        const firstUser = provideUser();
        fakeRepository.expectedResponse = Response.successOf(firstUser);

        const firstResponse = await repository.getCurrent();
        expectations.expectSuccess(firstResponse, firstUser);

        fakeRepository.expectedResponse = Response.failure(['FAIL']);

        const secondResponse = await repository.getCurrent();

        expectations.expectSuccess(secondResponse, firstUser);
    });

    it('Invalidates cache after image upload', async () => {
        const firstUser = provideUser();
        fakeRepository.expectedResponse = Response.successOf(firstUser);
        const newImagePath = '1/1/profile.jpg';
        const secondUser = provideAnotherUser();

        const firstResponse = await repository.getCurrent();
        expectations.expectSuccess(firstResponse, firstUser);

        fakeRepository.expectedResponse = Response.successOf(newImagePath);
        const image = new File(["Complex image"], "image.jpg", { type: 'text/plain' });

        const uploadResponse = await repository.uploadImage(image);
        expectations.expectSuccess(uploadResponse, newImagePath);

        fakeRepository.expectedResponse = Response.successOf(secondUser);

        const secondResponse = await repository.getCurrent();
        expectations.expectSuccess(secondResponse, secondUser);
    });

    it('Invalidates cache after profile update', async () => {
        const firstUser = provideUser();
        fakeRepository.expectedResponse = Response.successOf(firstUser);
        const secondUser = provideAnotherUser();

        const firstResponse = await repository.getCurrent();
        expectations.expectSuccess(firstResponse, firstUser);

        fakeRepository.expectedResponse = Response.success();

        const updateResponse = await repository.update(new UserProfileUpdate(secondUser.name, secondUser.email));
        expectations.expectSuccessEmptyValue(updateResponse);

        fakeRepository.expectedResponse = Response.successOf(secondUser);

        const secondResponse = await repository.getCurrent();
        expectations.expectSuccess(secondResponse, secondUser);
    });
});

function provideUser(): UserProfile {
    return new UserProfile('first', 'first@first.com', 'image.jpg');
}

function provideAnotherUser(): UserProfile {
    return new UserProfile('another', 'another@another.com', 'another_image.jpg');
}

