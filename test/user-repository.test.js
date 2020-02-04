import { expect } from 'chai';
import { Response } from "../src/core/model/response.js";
import { UserRepository } from "../src/core/repository/user-repository.js";
import {SmartRequestsFake} from "./fake/smart-requests-fake.js";
import * as tools  from "./tools/test-tools.js";

const endpoints = {
    signIn: "sign-in",
    signUp: "sign-up",
    activateAccount: "account-activation"
};
const requestsFake = new SmartRequestsFake();
const userRepository = new UserRepository(requestsFake, endpoints);

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
            let expectedResponse = Response.successOf(1);
            requestsFake.expectedResponse = Response.successOf({id: expectedResponse.value});
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
            let token = {token: user.nameOrEmail};
            requestsFake.expectedResponse = Response.successOf(token);
            return userRepository.matchUser(user.nameOrEmail, user.password).then(r => {
                expect(requestsFake.capturedData).to.eql(user);
                expect(r.success).to.eq(true)
                expect(r.value).to.eq(token);
            });
        });
    }

    it(`Activates user from token`, () => {
        let token = "ABc35DDf_f34";
        requestsFake.expectedResponse = Response.success();
        return userRepository.activateUser(token).then(r => {
            expect(requestsFake.capturedUrl).to.equal(endpoints.activateAccount + "/" + token);
            expect(r.success).to.eq(true);
            expect(r.value).to.include({});
        });
    });
});


