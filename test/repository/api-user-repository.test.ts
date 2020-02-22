import { expect } from 'chai';
import FakeRequestResponse from "../fake/fake-request-response";
import FakeRequests from "../fake/fake-requests";
import SmartRequests from "@/core/request/smart-requests";
import ApiUserRepository from "@/core/repository/api-user-repository";
import NewUser from "@/core/model/new-user";
import * as expectations from "../expectation/response-expectation";

const fakeRequests = new FakeRequests();
const signUpEndpoint = "sign-up";
const activateAccountEndpoint = "activate";
const repository = new ApiUserRepository(new SmartRequests(fakeRequests), signUpEndpoint, activateAccountEndpoint);

describe('ApiUserRepository tests', () => {
    it('Creates new user', async () => {
        const newUser = new NewUser('user', 'user@email,com', 'hardpass');
        fakeRequests.requestResponse = FakeRequestResponse.withEmptyJson();

        const r = await repository.createNewUser(newUser);
        expect(fakeRequests.capturedUrl).to.equal(signUpEndpoint);
        expect(fakeRequests.capturedData).to.equal(JSON.stringify(newUser));
        expectations.expectSuccessEmptyValue(r);
    });

    it('Creating new user propagates errors', () => {
        const errors = ["EXCEPTION"];
        fakeRequests.requestResponse = FakeRequestResponse.withErrors(errors);

        return repository.createNewUser({ name: 'A', email: 'c', password: 'xxx' }).then(r =>
            expectations.expectFailure(r, errors)
        );
    });

    it('Activates user', async () => {
        const token = 'secret_token';
        fakeRequests.requestResponse = FakeRequestResponse.withEmptyJson();
        const expectedUrl = activateAccountEndpoint + '/' + token;

        const r = await repository.activateUser(token);
        expectations.expectSuccessEmptyValue(r);
        expect(fakeRequests.capturedUrl).to.equal(expectedUrl);
    });
});

