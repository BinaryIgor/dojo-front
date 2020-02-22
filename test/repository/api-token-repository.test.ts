import { expect } from 'chai';
import { FakeRequestResponse } from "../fake/fake-request-response";
import { FakeRequests } from "../fake/fake-requests";
import { SmartRequests } from "@/core/request/smart-requests";
import { ApiTokenRepository } from "@/core/repository/api-token-repository";
import * as expectations from "../expectation/response-expectation";

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
            expectations.expectSuccess(r, expectedResponse);

            expect(fakeRequests.capturedUrl).to.equal(signInEndpoint);
            expect(fakeRequests.capturedData).to.equal(JSON.stringify(tokenRequest));
        });
    });
});