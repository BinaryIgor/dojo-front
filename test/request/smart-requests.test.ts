import { expect } from 'chai';
import {FakeRequestResponse} from "../fake/fake-request-response";
import { FakeRequests } from "../fake/fake-requests";
import {SmartRequests} from "@/core/request/smart-requests";

const fakeRequests = new FakeRequests();
const requests = new SmartRequests(fakeRequests);

describe('SmartRequests tests', () => {
    it('getJson returns success with data', () => {
        const expectedData = {
            id: 1,
            name: "user"
        };
        const expectedResponse = new FakeRequestResponse();
        expectedResponse.textResponse = JSON.stringify(expectedData);
        fakeRequests.requestResponse = expectedResponse;
        const url = "data";

        return requests.getJson(url).then(r => {
            expect(fakeRequests.capturedUrl).to.equal(url);

            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal(expectedData);
        });
    });

    it('getJson propagates error', () => {
        const errors = ["PROPAGATED"];
        fakeRequests.requestResponse = FakeRequestResponse.withErrors(errors);

        return requests.getJson('interesting-data').then(r => {
            expect(r.success).to.equal(false);
            expect(r.exceptions).to.deep.equal(errors);
        });
    });

    it('postJson returns success', () => {
        const expectedData = {
            name: "user",
            password: "12344"
        };
        const expectedResponse = new FakeRequestResponse();
        expectedResponse.textResponse = JSON.stringify({});
        fakeRequests.requestResponse = expectedResponse;
        const url = "post";

        return requests.postJson(url, expectedData).then(r => {
            expect(fakeRequests.capturedUrl).to.equal(url);
            expect(fakeRequests.capturedData).to.equal(JSON.stringify(expectedData));

            expect(r.success).to.equal(true);
            expect(r.value).to.deep.equal({});
        });
    })
})