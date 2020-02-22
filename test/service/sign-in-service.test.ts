import { expect } from 'chai';
import Response from "@/core/response/response";
import Token from "@/core/model/token";
import FakeTokenRepository from "../fake/fake-token-repository";
import FakeTokenStore from "../fake/fake-token-store";
import SignInService from "@/core/service/sign-in-service";
import SignInInput from "@/core/model/input/sign-in-input";
import SignInInputErrors from "@/core/error/sign-in-input-errors";
import { messageWithObjects } from "../tool/test-tools";
import { toTokenRequest } from "@/core/mapper/input-mapper";
import * as expectations from "../expectation/input-response-expectations";

const fakeTokenRepository = new FakeTokenRepository();
const fakeTokenStore = new FakeTokenStore();
const service = new SignInService(fakeTokenRepository, fakeTokenStore);

describe('SignInService tests', () => {
    for (const [input, errors] of provideInputsWithExpectedErrors()) {
        it(messageWithObjects('Sets ? errors with ? input', errors, input), () =>
            service.signIn(input).then(r => expectations.expectInputErrors(r, errors))
        );
    }

    it('Signs in', async () => {
        const token = new Token('Secret234');
        fakeTokenRepository.expectedResponse = Response.successOf(token);

        const input = provideProperInput();
        const expectedCapturedRequest = toTokenRequest(input);

        const r = await service.signIn(input);
        expectations.expectSuccess(r, token);
        expect(fakeTokenRepository.capturedTokenRequest).to.deep.equal(expectedCapturedRequest);
    });

    it('Propagates sign in errors', async () => {
        const errors = ['ERROR1', 'ERROR2'];
        fakeTokenRepository.expectedResponse = Response.failure(errors);

        const r = await service.signIn(provideProperInput());
        return expectations.expectRequestErrors(r, errors);
    });
});

function provideInputsWithExpectedErrors(): [SignInInput, SignInInputErrors][] {
    return [
        [new SignInInput('al', '13445'), new SignInInputErrors(true, false, true)],
        [new SignInInput('Aloes', 'weakpass'), new SignInInputErrors(false, false, true)],
        [new SignInInput('gmail@gmail.com', 'wrongOne'), new SignInInputErrors(false, false, true)],
        [new SignInInput('@tlen.pl', 'StrongPass12'), new SignInInputErrors(false, true, false)]
    ];
}

function provideProperInput(): SignInInput {
    return new SignInInput('email@email.com', 'Secret23Passs');
}