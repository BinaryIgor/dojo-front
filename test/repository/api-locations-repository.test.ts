import { expect } from 'chai';
import ApiLocationsRepository from "@/core/repository/api-locations-repository";
import * as expectations from "../expectation/response-expectations";
import FakeSmartRequests from '../fake/fake-smart-requests';
import Response from "@/core/response/response";

const fakeRequests = new FakeSmartRequests();
const locationsEndpoint = "city";
const repository = new ApiLocationsRepository(fakeRequests, locationsEndpoint);

describe('ApiLocationsRepository tests', () => {
    it('Returns all locations', async () => {
        const locations = ['Poznań', 'Łódź']
        fakeRequests.expectedResponse = Response.successOf(locations);

        const response = await repository.getAll();

        expectations.expectSuccess(response, locations);
        expect(fakeRequests.capturedUrl).to.equal(locationsEndpoint);
    });

    it('Get all locations propagates request errors', async () => {
        const exceptions = ['INTERNAL_ERROR', 'EXTERNAL_CAUSE'];
        fakeRequests.expectedResponse = Response.failure(exceptions);

        const response = await repository.getAll();

        expectations.expectFailure(response, exceptions);
    });
});