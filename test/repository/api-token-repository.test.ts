import { expect } from 'chai';
import ApiTokenRepository from "@/core/repository/api-token-repository";
import * as expectations from "../expectation/response-expectation";
import FakeSmartRequests from '../fake/fake-smart-requests';
import Response from "@/core/response/response";

const fakeRequests = new FakeSmartRequests();
const signInEndpoint = "sign-in";
const repository = new ApiTokenRepository(fakeRequests, signInEndpoint);

describe('ApiTokenRepository tests', () => {
    it('gets token', async () => {
        const tokenRequest = {
            nameOrEmail: 'igor@gmail.com',
            password: 'secret1222one'
        };
        const expectedResponse = { token: 'secretToken' };
        fakeRequests.expectedResponse = Response.successOf(expectedResponse);

        const response = await repository.getOne(tokenRequest);

        expectations.expectSuccess(response, expectedResponse);
        expect(fakeRequests.capturedUrl).to.equal(signInEndpoint);
        expect(fakeRequests.capturedData).to.equal(tokenRequest);
    });
});