import { expect } from 'chai';
import { Response } from "../../src/core/model/response.js";
import { UserRepositoryFake } from "../fake/user-repository-fake.js";
import { TokenStoreFake} from "../fake/token-store-fake.js";
import { SignInService } from "../../src/core/service/sign-in-service.js";
import * as tools from "../tools/test-tools.js";

const userRepositoryFake = new UserRepositoryFake();
const tokenStoreFake = new TokenStoreFake();
const service = new SignInService(userRepositoryFake, tokenStoreFake);

describe('SignInService tests', () => {
    for (let modelExpectation of provideModelsWithExpectedErrors()) {
        it(`Sets ${tools.printObject(modelExpectation.expectation)} errors`,
            () => service.signIn({
                nameOrEmail: modelExpectation.model.nameOrEmail,
                password: modelExpectation.model.password
            }).then(r => expect(r.formErrors).to.include(modelExpectation.expectation))
        )
    }

    for (let modelExpectation of provideModelsWithExpectedResponses()) {
        it(`Returns success with ${tools.printObject(modelExpectation.model)} input`,
         () => {
            let tokenValue = modelExpectation.expectation;
            userRepositoryFake.expectedResponse = Response.successOf(tokenValue);
            return service.signIn(modelExpectation.model)
                .then(r => {
                    expect(r.success).to.equal(true);
                    expect(modelExpectation.model).to.include(userRepositoryFake.capturedUser);
                    expect(tokenStoreFake.token).to.eq(tokenValue);
                });  
        });
    }
});

function provideModelsWithExpectedErrors() {
    let first = {
        model: {
            nameOrEmail: 'al',
            password: '13445',
        },
        expectation: {
            nameError: true,
            emailError: false,
            passwordError: true,
        }
    };

    let second = {
        model: {
            nameOrEmail: 'Aloes',
            password: 'weakpass',
        },
        expectation: {
            nameError: false,
            emailError: false,
            passwordError: true,
        }
    };

    let third = {
        model: {
            nameOrEmail: 'gmail@gmail.com',
            password: 'wrongOne',
        },
        expectation: {
            nameError: false,
            emailError: false,
            passwordError: true,
        }
    };

    let fourth = {
        model: {
            nameOrEmail: '@tlen.pl',
            password: 'StrongPass12',
        },
        expectation: {
            nameError: false,
            emailError: true,
            passwordError: false,
        }
    };

    return [first, second, third, fourth];
}

function provideModelsWithExpectedResponses() {
    let first = {
        model: {
            nameOrEmail: 'Ala',
            password: 'Minimal12',
        },
        expectation: "SecretToken123"
    };

    let second = {
        model: {
            nameOrEmail: 'tośka@tlen.pl',
            password: 'kośCi1223',
        },
        expectation: "TokenSecret"
    };

    return [first, second];
}