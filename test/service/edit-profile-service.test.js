import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { EditProfileService } from "../../src/core/service/edit-profile-service.js";
import { UserProfileRepositoryFake } from "../fake/user-profile-repository-fake.js";
import { printObject } from "../tools/test-tools.js";

const repositoryFake = new UserProfileRepositoryFake();
const service = new EditProfileService(repositoryFake);

describe('EditProfileService tests', () => {
    it('Returns current user profile', () => {
        let expectedProfile = {
            id: 1,
            name: "name",
            email: "email",
            imagePath: ""
        };
        repositoryFake.expectedResponse = Response.successOf(expectedProfile);

        return service.getCurrentUserProfile().then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.equal(expectedProfile);
        });
    });

    it('Uploads profile image', () => {
        let dummyImage = "image";
        let expectedResponseValue = "path";
        repositoryFake.expectedResponse = Response.successOf(expectedResponseValue);

        return service.uploadProfileImage(dummyImage).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.equal(expectedResponseValue);
            expect(repositoryFake.capturedImage).to.equal(dummyImage);
        });
    });

    for (let inputExpectation of provideShouldUpdateInputsExpectations()) {
        it(`Should update profile returns ${inputExpectation.expectation} with ${printObject(inputExpectation.input)}`,
            () => {
                let [name, newName, email, newEmail] = Object.values(inputExpectation.input);
                expect(service.shouldUpdateProfile(name, newName, email, newEmail))
                    .to.equal(inputExpectation.expectation);
            });
    }

    for (let inputErrors of provideUpdateProfileInputWithInputErrors()) {
        it(`Update profile returns input errors with ${printObject(inputErrors.input)}`,
         () =>{
            let updateProfile = inputErrors.input.userProfileUpdate;
            let previousUserProfile = inputErrors.input.previousUserProfile;
            return service.updateProfile(updateProfile, previousUserProfile).then(r => {
                expect(r.success).to.equal(false);
                expect(r.inputErrors).to.deep.equal(inputErrors.errors);
            });
        })
    }

    it('Update profile propagates request errors', () => {
        let exceptions = ['INVALID_NAME', 'INVALID_EMAIL'];
        repositoryFake.expectedResponse = Response.failure(exceptions);
        
        let [updateProfile, previousProfile] = provideValidUpdateProfileInput();

        return service.updateProfile(updateProfile, previousProfile).then(r => {
            expect(r.success).to.equal(false);
            expect(r.requestErrors).to.deep.equal(exceptions);
        });
    });

    it('Update profile returns new profile', () => {
        let [updateProfile, previousProfile] = provideValidUpdateProfileInput();
        let expectedReturnProfile = {
            id: 1,
            name: updateProfile.newName,
            email: updateProfile.newEmail,
            imagePath: ""
        };
        repositoryFake.expectedResponse = Response.successOf(expectedReturnProfile);

        return service.updateProfile(updateProfile, previousProfile).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal({
                name: expectedReturnProfile.name,
                email: expectedReturnProfile.email
            });
            expect(repositoryFake.capturedProfileUpdate).to.deep.equal(updateProfile);
        });
    });
});


function provideShouldUpdateInputsExpectations() {
    let name = "Name";
    let email = "email@email.com";

    let first = {
        input: {
            name: name,
            newName: "",
            email: email,
            newEmail: ""
        },
        expectation: false
    };

    let second = {
        input: {
            name: name,
            newName: name,
            email: email,
            newEmail: email
        },
        expectation: false
    };

    let third = {
        input: {
            name: name,
            newName: "",
            email: email,
            newEmail: `12${email}`
        },
        expectation: true
    };

    let fourth = {
        input: {
            name: name,
            newName: `${name}34`,
            email: email,
            newEmail: email
        },
        expectation: true
    };

    let fifth = {
        input: {
            name: name,
            newName: "Newname",
            email: email,
            newEmail: "newemail@email.com"
        },
        expectation: true
    }

    return [first, second, third, fourth, fifth];
}

function provideUpdateProfileInputWithInputErrors() {
    let previousUserProfile = {
        name: "Bright",
        email: "bright@bright.com"
    };

    let first = {
        input: {
            userProfileUpdate: {
                newName: "Bx",
                newEmail: "br@"
            },
            previousUserProfile: previousUserProfile
        },
        errors: {
            newNameError: true,
            newEmailError: true
        }
    };

    let second = {
        input: {
            userProfileUpdate: {
                newName: "Bright",
                newEmail: "b@.com"
            },
            previousUserProfile: previousUserProfile
        },
        errors: {
            newNameError: false,
            newEmailError: true
        }
    };

    let third = {
        input: {
            userProfileUpdate: {
                newName: "x11",
                newEmail: "email@email.com"
            },
            previousUserProfile: previousUserProfile
        },
        errors: {
            newNameError: true,
            newEmailError: false
        }
    };

    return [first, second, third];
}

function provideValidUpdateProfileInput() {
    return [
        {
            newName: 'Goodname',
            newEmail: 'good@email.com'
        },
        {
            name: 'Name',
            email: 'email@email.com'
        }
    ];
}
