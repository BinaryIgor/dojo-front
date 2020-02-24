import { expect } from 'chai';
import Response from "@/core/response/response";
import EditProfileService from "@/core/service/edit-profile-service";
import FakeUserProfileRepository from '../fake/fake-user-profile-repository';
import UserProfile from "@/core/model/user-profile";
import UserProfileUpdateInput from "@/core/model/input/user-profile-update-input";
import PasswordUpdateInput from "@/core/model/input/password-update-input";
import * as responseExpectations from "../expectation/response-expectations";
import * as inputResponseExpectations from "../expectation/input-response-expectations";
import { messageWithObjects } from "../tool/test-tools";
import UserProfileUpdateInputErrors from '@/core/error/user-profile-update-input-errors';
import { toUserProfileUpdate, toPasswordUpdate } from "@/core/mapper/input-mapper";
import PasswordUpdateInputErrors from '@/core/error/password-update-input-errors';

const fakeRepository = new FakeUserProfileRepository();
const service = new EditProfileService(fakeRepository);

describe('EditProfileService tests', () => {
    it('Returns current user profile', async () => {
        const expectedProfile = new UserProfile('name', 'email@email.com', "");
        fakeRepository.expectedResponse = Response.successOf(expectedProfile);

        const response = await service.getProfile();

        responseExpectations.expectSuccess(response, expectedProfile);
    });

    it('Uploads profile image', async () => {
        const image = new File(["Complex image"], "image.jpg", { type: 'text/plain' });
        fakeRepository.expectedResponse = Response.success();

        const response = await service.uploadProfileImage(image);

        responseExpectations.expectSuccessEmptyValue(response);
        expect(fakeRepository.capturedImageUpload).to.deep.equal(image);
    });

    for (const [input, expectation] of provideShouldUpdateInputsExpectations()) {
        it(messageWithObjects('Should update profile returns ? with ? input', expectation, input), async () => {
            const shouldUpdate = service.shouldUpdateProfile(input);
            expect(shouldUpdate).to.equal(expectation);
        });
    }

    for (const [input, errors] of provideUpdateProfileInputWithInputErrors()) {
        it(messageWithObjects('Update profile returns errors with ? input', input), async () => {
            const response = await service.updateProfile(input);
            inputResponseExpectations.expectInputErrors(response, errors);
        });
    }

    it('Update profile propagates request errors', async () => {
        const exceptions = ['INVALID_NAME', 'INVALID_EMAIL'];
        fakeRepository.expectedResponse = Response.failure(exceptions);

        const input = provideValidUpdateProfileInput();

        const response = await service.updateProfile(input);

        inputResponseExpectations.expectRequestErrors(response, exceptions);
    });

    it('Updates profile and returns new one', async () => {
        const input = provideValidUpdateProfileInput();
        const expectedProfileUpdate = toUserProfileUpdate(input);
        const expectedNewProfile = new UserProfile(input.newName, input.newEmail, "");
        fakeRepository.expectedResponse = Response.successOf(expectedNewProfile);

        const response = await service.updateProfile(input);

        inputResponseExpectations.expectSuccess(response, expectedNewProfile);
        expect(fakeRepository.capturedProfileUpdate).to.deep.equal(expectedProfileUpdate);
    });

    for (const [input, errors] of provideUpdatePasswordInputWithErrors()) {
        it(messageWithObjects('Update password returns errors with ? input', input), async () => {
            const response = await service.updatePassword(input);
            inputResponseExpectations.expectInputErrors(response, errors);
        });
    }

    it('Update password propagates response errors', async () => {
        const exceptions = ['INVALID_PASSWORD'];
        fakeRepository.expectedResponse = Response.failure(exceptions);

        const input = provideValidPasswordUpdateInput();
        const response = await service.updatePassword(input);

        inputResponseExpectations.expectRequestErrors(response, exceptions);
    });

    it('Updates password', async () => {
        fakeRepository.expectedResponse = Response.success();

        const input = provideValidPasswordUpdateInput();
        const expectedPasswordUpdate = toPasswordUpdate(input);

        const response = await service.updatePassword(input);

        inputResponseExpectations.expectSucessEmptyValue(response);
        expect(fakeRepository.capturedPasswordUpdate).to.deep.equal(expectedPasswordUpdate);
    });
});

function provideShouldUpdateInputsExpectations(): [UserProfileUpdateInput, boolean][] {
    const name = 'name';
    const email = 'email@email.com';
    return [
        [new UserProfileUpdateInput("", name, "", email), false],
        [new UserProfileUpdateInput(name, name, email, email), false],
        [new UserProfileUpdateInput("", name, `12${email}`, email), true],
        [new UserProfileUpdateInput(`${name}34`, name, email, email), true],
        [new UserProfileUpdateInput('newname', name, 'newemail@gmail.com', email), true]
    ];
}

function provideUpdateProfileInputWithInputErrors(): [UserProfileUpdateInput, UserProfileUpdateInputErrors][] {
    const name = 'Bright';
    const email = 'bright@bright.com';
    return [
        [
            new UserProfileUpdateInput("Bx", name, "br@", email),
            new UserProfileUpdateInputErrors(true, true)
        ],
        [
            new UserProfileUpdateInput("Bright", name, "b@.com", email),
            new UserProfileUpdateInputErrors(false, true)
        ],
        [
            new UserProfileUpdateInput("x11", name, "email@email.com", email),
            new UserProfileUpdateInputErrors(true, false)
        ]
    ];
}

function provideValidUpdateProfileInput(): UserProfileUpdateInput {
    return new UserProfileUpdateInput('Goodname', 'Name', 'good@email.com', 'email@email.com');
}

function provideUpdatePasswordInputWithErrors(): [PasswordUpdateInput, PasswordUpdateInputErrors][] {
    return [
        [
            new PasswordUpdateInput("BdOne", "", "wrong"),
            new PasswordUpdateInputErrors(true, true, false)
        ],
        [
            new PasswordUpdateInput('Bad122One', 'GoodOne12', 'GoodOne'),
            new PasswordUpdateInputErrors(false, false, true)
        ],
        [
            new PasswordUpdateInput('', 'Ne233One', 'Ne233One'),
            new PasswordUpdateInputErrors(true, false, false)
        ]
    ];
}

function provideValidPasswordUpdateInput(): PasswordUpdateInput {
    return new PasswordUpdateInput('HardPass12', 'HardPass123', 'HardPass123');
}