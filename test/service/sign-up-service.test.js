import { expect } from 'chai';
import chai from 'chai';
import { Response } from "../../src/core/model/response.js";
import { UserRepositoryFake } from "../fake/user-repository-fake.js";
import { SignUpService } from "../../src/core/service/sign-up-service.js";
import * as tools from "../tools/test-tools.js";

chai.config.truncateThreshold = 0;

const userRepositoryFake = new UserRepositoryFake();
const service = new SignUpService(userRepositoryFake);

describe("SignUpService tests", () => {
    for (let modelExpectation of provideModelsWithExpectedErrors()) {
        it(`Sets ${tools.printObject(modelExpectation.expectations)} errors`,
            () => service.signUp(modelExpectation.model)
                .then(r => expect(r.formErrors).to.include(modelExpectation.expectation))
        );
    }

    for (let modelExpectation of provideModelsWithExpectedResponses()) {
        it(`Returns succes with ${tools.printObject(modelExpectation.model)} input`,
            () => {
                userRepositoryFake.expectedResponse = Response.success(1);
                return service.signUp(modelExpectation.model)
                    .then(r => {
                        expect(r.success).to.equal(true);
                        expect(modelExpectation.model).to.include(userRepositoryFake.capturedNewUser);
                    });
            }
        );
    }
});

function provideModelsWithExpectedErrors() {
    let first = {
        model: {
            name: 'al',
            email: 'aadad',
            password: '13445',
            repeatedPassword: 'adada'
        },
        expectation: {
            nameError: true,
            emailError: true,
            passwordError: true,
            repeatedPasswordError: false
        }
    };

    let second = {
        model: {
            name: 'Gapek',
            email: 'gapek@gmail.com',
            password: 'hardOne1',
            repeatedPassword: 'hardOne123'
        },
        expectation: {
            nameError: false,
            emailError: false,
            passwordError: false,
            repeatedPasswordError: true
        }
    };

    let third = {
        model: {
            name: 'Ala',
            email: 'aad@',
            password: 'Superb9[pass',
            repeatedPassword: 'adada'
        },
        expectation: {
            nameError: false,
            emailError: true,
            passwordError: false,
            repeatedPasswordError: true
        }
    };

    let fourth = {
        model: {
            name: 'A',
            email: '@gmail.com',
            password: 'Good12Password',
            repeatedPassword: 'Good12Password'
        },
        expectation: {
            nameError: true,
            emailError: true,
            passwordError: false,
            repeatedPasswordError: false
        }
    };

    return [first, second, third, fourth];
}

function provideModelsWithExpectedResponses() {
    let first = {
        model: {
            name: 'ala',
            email: 'ala@gmail.com',
            password: 'Minimal12',
            repeatedPassword: 'Minimal12'
        },
        expectation: true
    };

    let second = {
        model: {
            name: 'Gapek',
            email: 'gapek@tlen.pl',
            password: 'Meczyk12',
            repeatedPassword: 'Meczyk12'
        },
        expectation: true
    };

    return [first, second];
}