import { expect } from 'chai';
import ApiTagsRepository from "@/core/repository/api-tags-repository";
import * as expectations from "../expectation/response-expectations";
import FakeSmartRequests from '../fake/fake-smart-requests';
import Response from "@/core/response/response";

const fakeRequests = new FakeSmartRequests();
const tagsEndpoint = "tag";
const repository = new ApiTagsRepository(fakeRequests, tagsEndpoint);

describe('ApiTagsRepository tests', () => {
    it('Returns all tags', async () => {
        const tags = ["HigherPurpose", "Art", "Education"];
        fakeRequests.expectedResponse = Response.successOf(tags);

        const response = await repository.getAll();

        expectations.expectSuccess(response, tags);
        expect(fakeRequests.capturedUrl).to.equal(tagsEndpoint);
    });

    it('Get all tags propagates request errors', async () => {
        const exceptions = ['SERVICE_NOT_AVAILABLE'];
        fakeRequests.expectedResponse = Response.failure(exceptions);

        const response = await repository.getAll();

        expectations.expectFailure(response, exceptions);
    });
});