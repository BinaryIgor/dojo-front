import { expect } from 'chai';
import FakeSmartRequests from "../fake/fake-smart-requests";
import ApiUserRepository from "@/core/repository/api-user-repository";
import NewUser from "@/core/model/new-user";
import * as expectations from "../expectation/response-expectation";
import Response from '@/core/response/response';

const fakeRequests = new FakeSmartRequests();
const signUpEndpoint = "sign-up";
const activateAccountEndpoint = "activate";
const repository = new ApiUserRepository(fakeRequests, signUpEndpoint, activateAccountEndpoint);

describe('ApiUserRepository tests', () => {
    it('Creates new user', async () => {
        const newUser = new NewUser('user', 'user@email,com', 'hardpass');
        fakeRequests.expectedResponse = Response.success();

        const r = await repository.createNewUser(newUser);
        expect(fakeRequests.capturedUrl).to.equal(signUpEndpoint);
        expect(fakeRequests.capturedData).to.deep.equal(newUser);
        expectations.expectSuccessEmptyValue(r);
    });

    it('Creating new user propagates errors', () => {
        const errors = ["EXCEPTION"];
        fakeRequests.expectedResponse = Response.failure(errors);

        return repository.createNewUser({ name: 'A', email: 'c', password: 'xxx' }).then(r =>
            expectations.expectFailure(r, errors)
        );
    });

    it('Activates user', async () => {
        const token = 'secret_token';
        fakeRequests.expectedResponse = Response.successOf(token);
        const expectedUrl = activateAccountEndpoint + '/' + token;

        const r = await repository.activateUser(token);
        expectations.expectSuccessEmptyValue(r);
        expect(fakeRequests.capturedUrl).to.equal(expectedUrl);
    });
});

