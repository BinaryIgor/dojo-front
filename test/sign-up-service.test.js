import { expect } from 'chai';
import chai from 'chai';
import { UserRepository } from "../src/core/repository/user-repository.js";
import { SmartRequestsFake } from "./fake/smart-requests-fake.js";
import { SignUpService } from "../src/core/service/sign-up-service.js";
import * as tools from "./tools/test-tools.js";

chai.config.truncateThreshold = 0;

const requestsFake = new SmartRequestsFake();
const userRepository = new UserRepository(requestsFake);
const service = new SignUpService(userRepository);

describe("SignUpService tests", () => {
    for (let modelExpectations of provideModelsWithExpectations()) {
        it(`Sets ${tools.printObject(modelExpectations.expectations)} errors`, () => {
            tools.setObjectFromObject(["name", "email", "password", "repeatedPassword"],
                service.model, modelExpectations.model);

            service.methods.signUp();

            expect(service.model).to.include(modelExpectations.expectations);
        });
    }
});


function provideModelsWithExpectations() {
    let first = {
        model: {
            name: 'al',
            email: 'aadad',
            password: '13445',
            repeatedPassword: 'adada'
        },
        expectations: {
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
        expectations: {
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
        expectations: {
            nameError: false,
            emailError: true,
            passwordError: false,
            repeatedPasswordError: true
        }
    };

    let forth = {
        model: {
            name: 'A',
            email: '@gmail.com',
            password: 'Good12Password',
            repeatedPassword: 'Good12Password'
        },
        expectations: {
            nameError: true,
            emailError: true,
            passwordError: false,
            repeatedPasswordError: false
        }
    };
    
    return [first, second, third, forth];
}