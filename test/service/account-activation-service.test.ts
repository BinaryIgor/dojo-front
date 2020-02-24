import { expect } from 'chai';
import FakeUserRepository from "../fake/fake-user-repository";
import AccountActivationService from "@/core/service/account-activation-service";
import { expectSuccessEmptyValue } from "../expectation/response-expectations";
import Response from "../../src/core/response/response";

const fakeRepository = new FakeUserRepository();
const service = new AccountActivationService(fakeRepository);

describe('AccountActivationService tests', () => {
    it('activates account', async () => {
        const token = "secret_ABFFSx3";
        fakeRepository.expectedResponse = Response.success();

        const response = await service.activateAccount(token);

        expectSuccessEmptyValue(response);
        expect(fakeRepository.capturedToken).to.equal(token);
    })
});