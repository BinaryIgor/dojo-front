import { expect } from 'chai';
import { Response } from "../src/core/model/response.js";
import { UserRepository } from "../src/core/repository/user-repository.js";
import {SmartRequestsFake} from "./fake/smart-requests-fake.js";
import * as tools  from "./tools/test-tools.js";

const requestsFake = new SmartRequestsFake();
const userRepository = new UserRepository(requestsFake);

describe('UserRepository tests', () => {
    const validNewUsers = [
        {
            name: 'Igor',
            email: 'igor@gmail.com',
            password: 'Password'
        }, 
        {
            name: 'Ala',
            email: 'ala@tlen.pl',
            password: 'sekretnaAla'
        }
    ];
    for (let newUser of validNewUsers) {
        it(`Creates new user ${tools.printObject(newUser)}`, () => {
            let expectedResponse = Response.success(1);
            requestsFake.expectedResponse = Response.success({id: 1});
            return userRepository.createNewUser(newUser).then(r => {
                expect(requestsFake.capturedData).to.eql(newUser);
                expect(r.success).to.eq(true)
                expect(r.value).to.eq(expectedResponse.value);
            });
        });
    }

    const validUsers = [
        {
            nameOrEmail: 'Igor',
            password: 'Password12'
        }, 
        {
            nameOrEmail: 'ala@tlen.pl',
            password: 'sekretnaAla'
        }
    ];
    for (let user of validUsers) {
        it(`Matches user ${tools.printObject(user)}`, () => {
            let tokenValue = user.nameOrEmail;
            requestsFake.expectedResponse = Response.success({token: tokenValue});
            return userRepository.matchUser(user.nameOrEmail, user.password).then(r => {
                expect(requestsFake.capturedData).to.eql(user);
                expect(r.success).to.eq(true)
                expect(r.value).to.eq(tokenValue);
            });
        });
    }
});


