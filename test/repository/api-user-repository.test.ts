import { expect } from 'chai';
import { FakeRequestResponse } from "../fake/fake-request-response";
import { FakeRequests } from "../fake/fake-requests";
import { SmartRequests } from "@/core/request/smart-requests";
import { ApiUserRepository } from "@/core/repository/api-user-repository";
import { NewUser } from "@/core/model/new-user";

const fakeRequests = new FakeRequests();
const signUpEndpoint = "sign-up";
const activateAccountEndpoint = "activate";
const repository = new ApiUserRepository(new SmartRequests(fakeRequests), signUpEndpoint, activateAccountEndpoint);

describe('ApiUserRepository tests', () => {
    it('Creates new user', () => {
        const newUser = new NewUser('user', 'user@email,com', 'hardpass');
        fakeRequests.requestResponse = FakeRequestResponse.withEmptyJson();

        return repository.createNewUser(newUser).then(r => {
            expect(fakeRequests.capturedUrl).to.equal(signUpEndpoint);
            expect(fakeRequests.capturedData).to.equal(JSON.stringify(newUser));

            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal({});
        });
    })

    it('Creating new user propagates errors', () => {
        const errors = ["EXCEPTION"];
        fakeRequests.requestResponse = FakeRequestResponse.withErrors(errors);

        return repository.createNewUser({name: 'A', email: 'c', password: 'xxx'}).then(r => {
            expect(r.success).to.equal(false);
            expect(r.exceptions).to.deep.equal(errors);
        });
    })

    it('Activates user', () => {
        const token = 'secret_token';
        fakeRequests.requestResponse = FakeRequestResponse.withEmptyJson();
        const expectedUrl = activateAccountEndpoint + '/' + token;

        return repository.activateUser(token).then(r => {
            expect(r.success).to.equal(true);
            expect(fakeRequests.capturedUrl).to.equal(expectedUrl);
        });
    });
});

