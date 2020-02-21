import { expect } from 'chai';
import { FakeRequestResponse } from "../fake/fake-request-response";
import { FakeRequests } from "../fake/fake-requests";
import { SmartRequests } from "@/core/request/smart-requests";
import { ApiTokenRepository } from "@/core/repository/api-token-repository";

const fakeRequests = new FakeRequests();
const signInEndpoint = "sign-in";
const repository = new ApiTokenRepository(new SmartRequests(fakeRequests), signInEndpoint);

describe('ApiTokenRepository tests', () => {
    it('gets token', () => {
        const tokenRequest = {
            nameOrEmail: 'igor@gmail.com',
            password: 'secret1222one'
        };
        const expectedResponse = { token: 'secretToken'};
        fakeRequests.requestResponse = FakeRequestResponse.withJsonAsText(expectedResponse);

        return repository.getOne(tokenRequest).then(r => {
            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(expectedResponse);

            expect(fakeRequests.capturedUrl).to.equal(signInEndpoint);
            expect(fakeRequests.capturedData).to.equal(JSON.stringify(tokenRequest));
        });
    });
});